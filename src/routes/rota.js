import express from "express";
import usuario from "./usuario.js";
import produto from "./produto.js";
import {verifyToken as auth} from "../middleware/auth.js"

const rota = express.Router();


rota.use("/usuario", usuario);
rota.use("/produto", auth, produto);

export default rota;

