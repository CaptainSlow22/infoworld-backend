import { Router } from "express";
import programari from "../db/programareObj.js";
import clienti from "../db/clientObj.js";

const progRouter = Router();

// Vezi toate programarile
progRouter.get('/', (req, res) => {
    try {   
        if(programari.length < 1) {
            return res.status(404).send({error: "Nu exista programari"});
        }
        
        return res.status(200).send({programari: programari});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Vezi programare dupa id
progRouter.get('/:id', (req, res) => {
    try {
        const {id} = req.params;

        const programare = programari.find((pr) => pr.id === Number(id));

        if(!programare) {
            return res.status(404).send({error: `Nu exista programare cu id-ul: ${id}`});
        }
        
        return res.status(200).send({programare: programare});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Adauga programare noua
progRouter.post('/', (req, res) => {
    try {
        const {metoda, clientId, serieSasiu, actiune} = req.body;

        if(!metoda || !clientId || !serieSasiu || !actiune) {
            return res.status(400).send({error: "Completeaza campurile obligatorii: metoda, clientId, serieSasiu, actiune"});
        }

        if(!['email', 'telefon', 'in persoana'].includes(metoda.toLowerCase())) {
            return res.status(400).send({error: "Metoda invalida"});
        }

        const client = clienti.find(cl => cl.id === clientId)

        if(!client) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${clientId}`});
        }

        if(serieSasiu.length !== 17) {
            return res.status(400).send({error: 'Serie de sasiu invalida'});
        }
    
        if(!client.masini.find(m => m.serieSasiu === serieSasiu)) {
            return res.status(404).send({error: `Clientul nu detine masina cu seria de sasiu: ${serieSasiu}`});
        }      

        const programareNoua = {
            id: programari[0].id + programari.length || 1,
            metoda: String(metoda).charAt(0).toUpperCase() + String(metoda).slice(1),
            clientId,
            serieSasiu: String(serieSasiu).toUpperCase(),
            actiune: String(actiune).charAt(0).toUpperCase() + String(actiune).slice(1),
            intervalTimp: null
        }

        programari.push(programareNoua);

        return res.status(201).send({programare: programareNoua});
    } catch(error) {
        return res.status(500).send({error: "Interval Server Error"});
    }
});

export default progRouter;