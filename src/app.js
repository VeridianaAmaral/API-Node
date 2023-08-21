const express = require("express");
const app = express();
const baseUrl = "/api/v1";
const rota = require("./routes/rota");
const pool = require("./database/db");

app.use(express.json());
app.use(baseUrl, rota);

pool.connect((err) => {
    if (err) {
        console.log("Desconectado do banco"+ err);
    }else{
        console.log("Conectado no banco");
    }
})

module.exports = app;
