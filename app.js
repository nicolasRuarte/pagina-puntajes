import express from 'express'
import { guardarRegistro, obtenerRegistros, sacarTop10 } from './database.js';

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    const registros = await obtenerRegistros();
    res.status(200).render("index.ejs");    
})

app.get("/obtener-registros", async (req, res) => {
    res.json( await obtenerRegistros() );
})

app.get("/obtener-top10", async (req, res) => {
    res.json(await sacarTop10());
})

app.post("/enviar-datos", async (req, res) => {
    const registro = {
        nombreUsuario: req.body.nombreUsuario,
        puntaje: req.body.puntaje
    }

    await guardarRegistro(registro);
})

app.get("/top-diez", async (req, res) => {
    const topDiez = await sacarTop10(); 
    res.status(200).render("top-diez.ejs");
}) 

app.listen(PORT);