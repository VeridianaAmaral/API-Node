import express from "express";
import rota from "./routes/rota.js";
import pool from "./database/db.js";
import cors from "cors";

const app = express();
const baseUrl = "/api/v1";

const corsOptions = {
  origin: '*', // Permitindo todas as origens
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permite o envio de credenciais (como o token Bearer)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(baseUrl, rota);

pool.connect((err) => {
    if (err) {
        console.log("[APP] Desconectado do banco" + err);
    } else {
        console.log("[APP] Conectado no banco");
    }
})

export default app;
