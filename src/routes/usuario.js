import express from 'express';
const rota = express.Router();
import controller from "../controllers/usuarioController.js";
import { verifyToken as auth } from '../middleware/auth.js';

rota.post("/cadastro", (req, res) =>{
    controller.cadastro(req, res)
});
rota.get("/listagem/:tipo", auth,  (req,res)=>{
    controller.listar(req,res)
});
rota.put("/update", auth,  (req,res) => {
    controller.update(req, res)
});
rota.delete("/deletar/consumidor/:id", auth, (req,res) =>{
    controller.apagar(req,res, "consumidor")
});
rota.delete("/deletar/produtor/:id", auth, (req,res) =>{
    controller.apagar(req,res, "produtor")
});

rota.post("/login", (req, res) => {
    controller.authenticateUser(req, res)
});

export default rota;