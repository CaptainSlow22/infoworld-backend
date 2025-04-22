import { Router } from "express";
import programari from "../db/programareObj.js";
import clienti from "../db/clientObj.js";
import istoricService from "../db/istoricObj.js";

const statsRouter = Router();

statsRouter.get('/total-programari', (req, res) => {
    try {
        if(programari.length < 1) {
            return res.status(404).send({error: "Nu exista programari"});
        }

        return res.status(200).send({totalProgramari: programari.length});        
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

statsRouter.get('/medie-programari', (req, res) => {
    try {
        if(programari.length < 1) {
            return res.status(404).send({error: "Nu exista programari"});
        }

        if(clienti.length < 1) {
            return res.status(404).send({error: "Nu exista programari"});
        }

        return res.status(200).send({medieProgramari: programari.length / clienti.length});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

statsRouter.get('/timp-mediu-reparatie', (req, res) => {
    try {
        if(istoricService.length < 1) {
            return res.status(404).send({error: "Nu exista istoric"});
        }

        const timpTotal = istoricService.reduce((total, istoric) => {return total + istoric.durata}, 0);

        return res.status(200).send({timpMediuReparatie: timpTotal/istoricService.length});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

statsRouter.get('/top-marci-frecventa', (req, res) => {
    try {
        const serieToMarca = {};

        if(clienti.length < 1) {
            return res.status(404).send({error: "Nu exista clienti"});
        }

        clienti.forEach(client => {
            client.masini.forEach(masina => {
                serieToMarca[masina.serieSasiu] = masina.marca;
            });
        });

        const frecventaMarci = {};

        if(programari.length < 1) {
            return res.status(404).send({error: "Nu exista programari"});
        }

        programari.forEach(programare => {
            const marca = serieToMarca[programare.serieSasiu];
            if (marca) {
                frecventaMarci[marca] = (frecventaMarci[marca] || 0) + 1;
            }
        });

        const topMarci = Object.entries(frecventaMarci).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([marca, frecvnenta]) => ({ marca, frecvnenta }));

        return res.status(200).send({topMarci: topMarci});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

statsRouter.get('/distributie-motorizari', (req, res) => {
    try {
        const serieToMotorizare = {};

        if(clienti.length < 1) {
            return res.status(404).send({error: "Nu exista clienti"});
        }

        clienti.forEach(client => {
            client.masini.forEach(masina => {
                serieToMotorizare[masina.serieSasiu] = masina.tipMotorizare;
            });
        });

        const distributieMotorizare = {};

        if(programari.length < 1) {
            return res.status(404).send({error: "Nu exista programari"});
        }

        programari.forEach(programare => {
            const tip = serieToMotorizare[programare.serieSasiu];
            if (tip) {
                distributieMotorizare[tip] = (distributieMotorizare[tip] || 0) + 1;
            }
        });

        const distributie = Object.entries(distributieMotorizare).map(([motorizare, frecventa]) => ({motorizare, frecventa}));

        return res.status(200).send({distributieMotorizare: distributie});
    } catch(error) {
        return res.status(500).send({error: "Internal Server Error"});
    }
});

export default statsRouter;