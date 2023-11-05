import express from 'express';
const rota = express.Router();
import controller from "../controllers/usuarioController.js";

rota.post("/cadastro", (req, res) =>{
    controller.cadastro(req, res)
});
rota.get("/listagem/:tipo", (req,res)=>{
    controller.listar(req,res)
});
rota.put("/update", (req,res) => {
    controller.update(req, res)
});
rota.delete("/deletar/:id", (req,res) =>{
    controller.apagar(req,res)
});

export default rota;