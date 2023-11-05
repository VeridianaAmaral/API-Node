import express from "express";
import usuario from "./usuario.js";
import produto from "./produto.js";
const rota = express.Router();


rota.use("/usuario", usuario);
rota.use("/produto", produto);

export default rota;

