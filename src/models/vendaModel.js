import pool from "../database/db.js"
import crypt from "node:crypto"

class Model {
     cadastro = async (venda) =>{
        // inserirVenda(consumidor_id_r varchar, produtor_id_r varchar, status_r status, valor_r numeric, qtt_r numeric, anuncio_id_r varchar, venda_id_r varchar, item_venda_id_r varchar)

        const id_venda = crypt.randomUUID();
        const id_item_venda = crypt.randomUUID();
        const query = {
            text:`select inserirVenda($1, $2, $3, $4, $5, $6, $7, $8);`,
            values:[venda.consumidor_id, venda.produtor_id, venda.status, venda.valor, venda.qtt, venda.anuncio_id, id_venda, id_item_venda]
        }
    
        const resultado = await pool.query(query);
        return resultado;
    }
    
     listar = async(id, status) =>{
        const query ={
            text: `select  * from listarVendas($1, $2);`,
            values:[id, status]
        }
        const listagem = await pool.query(query);
        return listagem.rows;
    }

    listarPorId = async(id) =>{
        const query ={
            text: `SELECT * FROM venda WHERE id = $1;`,
            values:[id]
        }
        const listagem = await pool.query(query);
        return listagem.rows;
    }

}
export default new Model();