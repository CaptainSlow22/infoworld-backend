import { Router } from "express";
import istoricService from "../db/istoricObj.js";
import programari from "../db/programareObj.js";

const serviceRouter = Router();

// Vezi tot istoricul
serviceRouter.get('/', (req, res) => {
    try {
        if(istoricService.length < 1) {
            return res.status(404).send({error: "Nu exista istoric"});
        }
        
        return res.status(200).send({istoricService: istoricService});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Vezi istoric dupa id
serviceRouter.get('/:id', (req, res) => {
    try {
        const {id} = req.params;

        const istoric = istoricService.find((ist) => ist.id === Number(id));

        if(!istoric) {
            return res.status(404).send({error: `Nu exista istoric cu id-ul: ${id}`});
        }
        
        return res.status(200).send({istoric: istoric});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Adauga in istoric
serviceRouter.post('/', (req, res) => {
    try {
        const {programareId, defecteVizuale, mentiuniClient, motiv, operatiuni, pieseSchimbate, reparatii, durata} = req.body;

        if(!programareId || !motiv || !operatiuni || !reparatii || !durata) {
            return res.status(400).send({error: "Completeaza campurile obligatorii: programareId, motiv, operatiuni, reparatii, durata"});
        }
        
        const prog = programari.find(pr => pr.id === programareId);

        if(!prog) {
            return res.status(404).send({error: `Nu exista programare cu id-ul: ${programareId}`});
        }

        if(!['verificare', 'revizie'].includes(motiv.toLowerCase())) {
            return res.status(400).send({error: "Motiv invalid (corect - Verificare sau Revizie)"});
        }

        if(durata % 10 !== 0) {
            return res.status(400).send({error: "Durata invalida (corect - multiplu de 10 minute)"});
        }

        const istoricNou = {
            id: istoricService[0].id + istoricService.length || 1,
            programareId,
            primire: {
                defecteVizuale: defecteVizuale || [],
                mentiuniClient: mentiuniClient || [],
                motiv: String(motiv).charAt(0).toUpperCase() + String(motiv).slice(1)
            },
            procesare: {
                operatiuni,
                pieseSchimbate: pieseSchimbate || [],
                reparatii
            },
            durata
        }

        istoricService.push(istoricNou);

        return res.status(201).send({istoricService: istoricNou});
    } catch(error) {
        console.error(error);
        return res.status(500).send({error: "Internal Server Error"});
    }
})

export default serviceRouter;