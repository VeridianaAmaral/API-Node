import express from "express";
import usuario from "./usuario.js";
const rota = express.Router();


rota.use("/usuario", usuario);

export default rota;

