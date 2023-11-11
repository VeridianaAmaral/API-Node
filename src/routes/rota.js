import express from "express";
import usuario from "./usuario.js";
import produto from "./produto.js";
import venda from "./venda.js";
import {verifyToken as auth} from "../middleware/auth.js"

const rota = express.Router();
console.log("[ROUTER] Starting routes....");

rota.use("/usuario", usuario);
rota.use("/produto", auth, produto);
rota.use("/venda", auth, venda);

console.log("[ROUTER] Done!");


export default rota;

