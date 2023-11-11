import express from "express";
import rota from "./routes/rota.js";
import pool from "./database/db.js";
const app = express();
const baseUrl = "/api/v1";

app.use(express.json());
app.use(baseUrl, rota);

pool.connect((err) => {
    if (err) {
        console.log("[APP] Desconectado do banco"+ err);
    }else{
        console.log("[APP] Conectado no banco");
    }
})

export default app;
