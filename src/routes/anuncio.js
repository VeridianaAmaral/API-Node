import express from 'express';
const rota = express.Router();
import controller from "../controllers/anuncioController.js";
import {verifyToken as auth } from "../middleware/auth.js";

rota.post("/cadastro",auth, (req, res) =>{
    controller.cadastro(req, res)
});
rota.get("/listagem", (req,res)=>{
    controller.listar(req,res)
});

export default rota;