import { Router } from "express";
import clienti from "../db/clientObj.js";
const clientRouter = Router();

// Vezi toti clientii
clientRouter.get('/', (req, res) => {
    try {
        if(clienti.length < 1) {
            return res.status(404).send({error: "Nu exista clienti"});
        }
        
        return res.status(200).send({clienti: clienti});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Vezi client dupa id
clientRouter.get('/:id', (req, res) => {
    try {
        const {id} = req.params;

        const client = clienti.find((cl) => cl.id === Number(id));
        console.log(client);

        if(!client) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${id}`});
        }
        
        return res.status(200).send({client: client});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});


// Adauga client nou
clientRouter.post('/', (req, res) => {
    try {
        const {nume, prenume, numarTelefon, email} = req.body;
        
        if(!nume || !prenume || !numarTelefon || !email) {
            return res.status(400).send({error: "Completeaza campurile obligatorii: nume, prenume, numarTelefon, email"});
        }

        if(!email.includes("@")) {
            return res.status(400).send({error: "Email invalid"});
        }

        const clientExistent = clienti.find((cl) => cl.email === email)
        
        if(clientExistent) {
            return res.status(400).send({error: `Exista deja un client cu emailul: ${email}`});
        }

        if(numarTelefon.length !== 10 || numarTelefon.slice(0,2) !== "07") {
            return res.status(400).send({error: "Numar de telefon invalid"});
        }

        const clientNou = {
            id: clienti[0].id + clienti.length || 1,
            nume:  String(nume).charAt(0).toUpperCase() + String(nume).slice(1),
            prenume: String(prenume).charAt(0).toUpperCase() + String(prenume).slice(1),
            numarTelefon,
            email,
            masini: []
        }

        clienti.push(clientNou);

        return res.status(201).send({client: clientNou});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Sterge client
clientRouter.delete('/:id', (req, res) => {
    try {
        const {id} = req.params;

        const clientSters = clienti.find((cl) => cl.id === Number(id));

        if(!clientSters) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${id}`});
        }

        clienti.splice(id - 1, 1);

        return res.status(200).send({client: clientSters});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Modifica client
clientRouter.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { nume, prenume, numarTelefon, email } = req.body; 

        const client = clienti.find((cl) => cl.id === Number(id));

        if (!client) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${id}`});
        }

        if (nume !== undefined) client.nume = String(nume).charAt(0).toUpperCase() + String(nume).slice(1);

        if (prenume !== undefined) client.prenume = String(prenume).charAt(0).toUpperCase() + String(prenume).slice(1);

        if (numarTelefon !== undefined) {
            if(numarTelefon.length !== 10 || numarTelefon.slice(0,2) !== "07") {
                return res.status(400).send({error: "Numar de telefon invalid"});
            }
            else client.numarTelefon = numarTelefon;
        }

        if (email !== undefined) {
            if(!email.includes("@")) {
                return res.status(400).send({error: "Email invalid"});
            }
            else client.email = email;
        }

        return res.status(200).send({client: client});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Adauga masina
clientRouter.post('/:id', (req, res) => {
    try {
        const {id} = req.params;
        const {numarInmatriculare, serieSasiu, marca, model, anulFabricatiei, tipMotorizare, capacitateMotor, caiPutere} = req.body;

        const client = clienti.find((cl) => cl.id === Number(id));

        if (!client) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${id}`});
        }

        if(!numarInmatriculare || !serieSasiu || !marca || !anulFabricatiei || !tipMotorizare || !capacitateMotor || !caiPutere) {
            return res.status(400).send({error: "Completeaza campurile obligatorii: numarInmatriculare, serieSasiu, marca, model, anulFabricatiei, tipMotorizare, capacitateMotor, caiPutere"});
        }

        if(!numarInmatriculare.match(/^[A-Z]{1,2}-\d{2,3}-[A-Z]{3}$/)) {
            return res.status(400).send({error: "Numar de inmatriculare invalid"});
        }

        if(serieSasiu.length !== 17) {
            return res.status(400).send({error: "Serie de sasiu invalida"});
        }

        const masina = client.masini.find(m => m.serieSasiu.toLowerCase() === serieSasiu.toLowerCase())

        if(masina) {
            return res.status(400).send({error: "Masina este deja inregistrata"});
        }
        
        if(anulFabricatiei > 2025 || anulFabricatiei < 1920) {
            return res.status(400).send({error: "Anul fabricatiei invalid"});
        }

        if(!["benzina", "diesel", "hibrid", "electric"].includes(tipMotorizare.toLowerCase())) {
            return res.status(400).send({error: "Tip de motorizare invalid"});
        }

        const masinaNoua = {
            numarInmatriculare,
            serieSasiu: String(serieSasiu).toUpperCase(),
            marca: String(marca).charAt(0).toUpperCase() + String(marca).slice(1),
            model: String(model).charAt(0).toUpperCase() + String(model).slice(1),
            anulFabricatiei,
            tipMotorizare: String(tipMotorizare).charAt(0).toUpperCase() + String(tipMotorizare).slice(1),
            capacitateMotor,
            caiPutere,
            kWPutere: Math.floor(caiPutere / 1.341)
        }
    
        client.masini.push(masinaNoua);

        return res.status(201).send({client: client});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Sterge masina
clientRouter.delete('/:id/:serieSasiu', (req, res) => {
    try {
        const {id, serieSasiu} = req.params;

        const client = clienti.find((cl) => cl.id === Number(id));

        if (!client) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${id}`});
        }

        const masinaStearsa = client.masini.find(m => m.serieSasiu.toLowerCase() === serieSasiu.toLowerCase());

        if(!masinaStearsa) {
            return res.status(404).send({error: `Nu exista masina cu seria de sasiu: ${serieSasiu}`});
        }

        const index = client.masini.indexOf(masinaStearsa);

        if (index > -1) {
            client.masini.splice(index, 1);
        }
        
        return res.status(200).send({client: client});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

// Modifica masina
clientRouter.put('/:id/:serieSasiu', (req, res) => {
    try {
        const {id, serieSasiu} = req.params;
        const {numarInmatriculare, tipMotorizare, capacitateMotor, caiPutere} = req.body;

        const client = clienti.find((cl) => cl.id === Number(id));

        if (!client) {
            return res.status(404).send({error: `Nu exista client cu id-ul: ${id}`});
        }
        const masinaModificata = client.masini.find(m => m.serieSasiu === serieSasiu);

        if(!masinaModificata) {
            return res.status(404).send({error: `Nu exista masina cu seria de sasiu: ${serieSasiu}`});
        }
        
        if(numarInmatriculare !== undefined) {
            if(!numarInmatriculare.match(/^[A-Z]{1,2}-\d{2,3}-[A-Z]{3}$/)) {
                return res.status(400).send({error: "Numar de inmatriculare invalid"});
            }
                else masinaModificata.numarInmatriculare = numarInmatriculare;
        }

        if(tipMotorizare !== undefined) {
            if(!["benzina", "diesel", "hibrid", "electric"].includes(tipMotorizare.toLowerCase())) {
                return res.status(400).send({error: "Tip de motorizare invalid"});
            }
                else masinaModificata.tipMotorizare = tipMotorizare;
        }

        if(capacitateMotor !== undefined) masinaModificata.capacitateMotor = capacitateMotor;
        if(caiPutere !== undefined) masinaModificata.caiPutere = caiPutere;
      
        return res.status(200).send({client: client});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

export default clientRouter;