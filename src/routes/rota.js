const express = require("express");
const rota = express.Router();
const usuario = require("./usuario");

rota.use("/usuario", usuario);

module.exports = rota;

