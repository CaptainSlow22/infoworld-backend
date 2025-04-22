import { Router } from "express";
import programari from "../db/programareObj.js";

const adminRouter = Router();

// Seteaza intervalul unei programari
adminRouter.put('/:progId', (req, res) => {
    try {
        const {progId} = req.params;
        const {interval} = req.body;

        if(!interval) {
            return res.status(400).send({error: "Precizati intervalul de 30 de minute dorit intre orele 08:00-17:00"});
        }

        const prog = programari.find(pr => pr.id === Number(progId));

        if(!prog) {
            return res.status(404).send({error: `Nu exista programare cu id-ul: ${progId}`});
        }

        const match = interval.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/);
        if (!match) {
            return res.status(400).send({ error: "Format invalid (ex. 09:30-10:00)" });
        }

        const [ , startH, startM, endH, endM ] = match.map(Number);
        const startMin = startH * 60 + startM;
        const endMin = endH * 60 + endM;

        if (endMin - startMin !== 30) {
            return res.status(400).send({ error: "Intervalul nu este de 30 de minute" });
        }

        const minMin = 8 * 60;  // 08:00
        const maxMin = 17 * 60; // 17:00

        if (startMin < minMin || endMin > maxMin) {
            return res.status(400).send({ error: "Intervalul nu este intre orele 08:00-17:00." });
        }

        if(programari.find(pr => pr.intervalTimp === interval)) {
            return res.status(400).send({error: "Intervalul ales este deja alocat"});
        } 

        prog.intervalTimp = interval;

        return res.status(200).send({programare: prog});
        
    } catch(error) {
        console.error(error);
        return res.status(500).send({error: "Internal Server Error"});
    }
})

export default adminRouter;