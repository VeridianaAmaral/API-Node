import pool from "../database/db.js"
import crypt from "node:crypto"

class Model {
     cadastro = async (usuario) =>{
        // Desestruturação do objeto usuario
        const {nome, email, senha, data_nascimento, cep, uf, cidade, bairro, logradouro, numero, consumidor} = usuario;
        const id = crypt.randomUUID();
        const table = consumidor ? 'consumidor' : 'produtor';
        const query = {
            text:`INSERT INTO ${table}(id, nome, email, senha, data_nascimento, cep, uf, cidade, bairro, logradouro, numero) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`,
            values:[id, nome, email, senha, data_nascimento, cep, uf, cidade, bairro, logradouro, numero]
        }
    
        const resultado = await pool.query(query);
        return resultado;
    }
    
     listar = async() =>{
        const query ={
            text:"SELECT * FROM USUARIO;"
        }
        const listagem = await pool.query(query);
        return listagem.rows;
    }
    
     update = async (usuario) =>{
    
        const {id, nome , senha} = usuario;
        const query = (nome != undefined && senha != undefined) ?
        {
            text:"update usuario set nome=$1, senha=$2 where id = $3 returning *",
            values:[nome,senha,id],
        }
        : nome != undefined ? {
            text:"update usuario set nome=$1 where id = $2 returning *",
            values:[nome,id],
        }
        : senha != undefined ? {
            text:"update usuario set senha=$1 where id = $2 returning *",
            values:[senha,id],
        }
        : {}
    
        const editar = await pool.query(query);
        return editar.rows;
    }
    
     apagar = async (id) =>{
        const query = {
            text:"delete from usuario where id = $1",
            values:[id]
        }
        const deletar = await pool.query(query);
        return deletar;
    
    }

}
 

export default new Model();