import pool from "../database/db.js"
import crypt from "node:crypto"

class Model {
     cadastro = async (anuncio) =>{
        // Desestruturação do objeto usuario
        const {valor, qtt, produtor_id, produto_id} = anuncio;
        const id = crypt.randomUUID();
        const query = {
            text:`INSERT INTO anuncio(id, valor, qtt, produtor_id, produto_id) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
            values:[id, valor, qtt, produtor_id, produto_id]
        }
        const resultado = await pool.query(query);
        return resultado;
    }
    
     listar = async() =>{
        const query ={
            text: `SELECT * FROM anuncio;`
        }
        const listagem = await pool.query(query);
        return listagem.rows;
    }

}
export default new Model();