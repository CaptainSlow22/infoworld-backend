const istoricService = [
    {
        id: 1,
        programareId: 1,
        primire: {
            defecteVizuale: ["Ecranul de bord cu pixeli morți", "Zgomot la frânare"],
            mentiuniClient: ["Verificare frâne", "Revizie completă"],
            motiv: 'Revizie'
        },
        procesare: {
            operatiuni: ["Verificare sistem de frânare", "Verificare ulei motor"],
            pieseSchimbate: ["Discuri frână", "Plăcuțe frână", "Filtru aer"],
            reparatii: ["Înlocuire plăcuțe frână", "Curățare sistem de frânare"]
        },
        durata: 180
    },
    {
        id: 2,
        programareId: 2,
        primire: {
            defecteVizuale: ["Lumină pe bord pentru ulei scăzut", "Zgomote suspecte din motor"],
            mentiuniClient: ["Schimb ulei motor", "Verificare sistem de răcire"],
            motiv: 'Verificare'
        },
        procesare: {
            operatiuni: ["Schimb ulei motor", "Verificare termostat", "Curățare sistem răcire"],
            pieseSchimbate: ["Ulei motor", "Filtru ulei", "Termostat"],
            reparatii: ["Reparație la sistemul de răcire", "Înlocuire furtunuri de răcire"]
        },
        durata: 240
    },
    {
        id: 3,
        programareId: 3,
        primire: {
            defecteVizuale: ["Zgomote la direcție", "Fum la ieșirea din evacuare"],
            mentiuniClient: ["Verificare sistem direcție", "Verificare sistem evacuare"],
            motiv: 'Verificare'
        },
        procesare: {
            operatiuni: ["Verificare sistem direcție", "Verificare evacuare"],
            pieseSchimbate: ["Stabilizatoare direcție", "Articulație direcție"],
            reparatii: ["Înlocuire stabilizatoare direcție", "Verificare sistem de evacuare"]
        },
        durata: 150
    },
    {
        id: 4,
        programareId: 4,
        primire: {
            defecteVizuale: ["Lumină pe bord pentru presiune ulei scăzută", "Vibrații motor"],
            mentiuniClient: ["Verificare motor", "Schimb ulei și filtru ulei"],
            motiv: 'Revizie'
        },
        procesare: {
            operatiuni: ["Schimb ulei motor", "Verificare pompa ulei", "Verificare vibrații motor"],
            pieseSchimbate: ["Ulei motor", "Filtru ulei", "Pompa ulei"],
            reparatii: ["Înlocuire pompa ulei"]
        },
        durata: 120
    },
    {
        id: 5,
        programareId: 5,
        primire: {
            defecteVizuale: ["Probleme la aprindere motor", "Ecran de bord cu afișaj eronat"],
            mentiuniClient: ["Verificare sistem de aprindere", "Verificare senzor ecran"],
            motiv: 'Reparație urgentă'
        },
        procesare: {
            operatiuni: ["Verificare sistem aprindere", "Verificare ecran bord", "Schimb senzor ecran"],
            pieseSchimbate: ["Senzor aprindere", "Senzor ecran bord"],
            reparatii: ["Înlocuire senzor aprindere", "Reparație afișaj ecran bord"]
        },
        durata: 100
    },
    {
        id: 6,
        programareId: 6,
        primire: {
            defecteVizuale: ["Zgomot ciudat la accelerație", "Fugă de aer în habitaclu"],
            mentiuniClient: ["Verificare sistem de climatizare", "Verificare motor"],
            motiv: 'Verificare'
        },
        procesare: {
            operatiuni: ["Verificare sistem climatizare", "Verificare motor", "Testare sistem aer condiționat"],
            pieseSchimbate: ["Filtru aer climatizare", "Furtun sistem aer"],
            reparatii: ["Reparare furtun aer climatizare", "Verificare sistem aer condiționat"]
        },
        durata: 130
    },
    {
        id: 7,
        programareId: 7,
        primire: {
            defecteVizuale: ["Sisteme de frânare uzate", "Probleme cu faruri"],
            mentiuniClient: ["Verificare frâne", "Verificare iluminare faruri"],
            motiv: 'Revizie'
        },
        procesare: {
            operatiuni: ["Verificare frâne", "Verificare iluminare faruri"],
            pieseSchimbate: ["Plăcuțe frână", "Discuri frână", "Becuri faruri"],
            reparatii: ["Înlocuire plăcuțe frână", "Înlocuire discuri frână", "Schimb becuri faruri"]
        },
        durata: 160
    }
];

export default istoricService;
