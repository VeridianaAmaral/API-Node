const express = require("express");
const rota = express.Router();
const controller = require("../controllers/usuarioController");

rota.post("/cadastro", controller.cadastro, (req, res) =>{});
rota.get("/listagem", controller.listar, (req,res)=>{});
rota.put("/update", controller.update, (req,res) => {});
rota.delete("/deletar/:id", controller.apagar, (req,res) =>{});

module.exports = rota;