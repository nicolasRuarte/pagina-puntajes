import express from 'express'

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).render("index.ejs")
})

app.post("/enviar-datos", (req, res) => {
    const data = {
        nombreUsuario: req.body.nombreUsuario,
        puntaje: req.body.puntaje
    }
})

app.listen(PORT);