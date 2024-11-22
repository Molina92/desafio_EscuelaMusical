const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/canciones", (req, res) => {
    !fs.existsSync("./canciones.json") ? fs.writeFileSync("./canciones.json", "[]")
        : (() => {
            const canciones = JSON.parse(fs.readFileSync("./canciones.json", "utf-8"));
            res.send(canciones);
        })();
});

app.post("/canciones", (req, res) => {
    const nuevaCancion = req.body;

    const canciones = JSON.parse(fs.readFileSync("./canciones.json", "utf-8"));
    canciones.push(nuevaCancion);
    fs.writeFileSync("./canciones.json", JSON.stringify(canciones, null, canciones.length));

    res.send("Canción agregada con exito");
});






