import pool from "../database/db.js"
import crypt from "node:crypto"

class Model {
     cadastro = async (venda) =>{
        // Desestruturação do objeto usuario
        const {} = produto;
        const id = crypt.randomUUID();
        const query = {
            text:`INSERT INTO produto(id, imagem, nome, categoria ) values($1, $2, $3, $4) returning *`,
            values:[id, imagem, nome, categoria]
        }
    
        const resultado = await pool.query(query);
        return resultado;
    }
    
     listar = async() =>{
        const query ={
            text: `SELECT * FROM produto;`
        }
        const listagem = await pool.query(query);
        return listagem.rows;
    }
}
export default new Model();