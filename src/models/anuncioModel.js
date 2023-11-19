import pool from "../database/db.js"
import crypt from "node:crypto"

class Model {
     cadastro = async (anuncio) =>{
        // Desestruturação do objeto usuario
        const {valor, qtt, produtor_id, produto_id, unidade} = anuncio;
        const id = crypt.randomUUID();
        const query = {
            text:`INSERT INTO anuncio(id, valor, qtt, produtor_id, produto_id, unidade) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
            values:[id, valor, qtt, produtor_id, produto_id, unidade]
        }
        const resultado = await pool.query(query);
        return resultado;
    }
    
     listar = async() =>{
        const query ={
            text: `select pd.nome as produtorNome, pd.cidade, pd.uf, pt.nome as produtoNome, an.valor, an.qtt, an.unidade
            from anuncio an
            join produto pt
            on pt.id = an.produto_id
            join produtor pd
            on pd.id = an.produtor_id;`
        }
        const listagem = await pool.query(query);
        return listagem.rows;
    }

}
export default new Model();