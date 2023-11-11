import express from 'express';
const rota = express.Router();
import controller from "../controllers/anuncioController.js";

rota.post("/cadastro", (req, res) =>{
    controller.cadastro(req, res)
});
rota.get("/listagem", (req,res)=>{
    controller.listar(req,res)
});

export default rota;