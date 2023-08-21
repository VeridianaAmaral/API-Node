const pool = require("../database/db");

exports.cadastro = async (usuario) =>{
    const {nome , senha} = usuario;
    const query = {
        text:"INSERT INTO usuario(nome, senha) values($1, $2) returning *",
        values:[nome, senha]
    }
    const resultado = await pool.query(query);
    return resultado;
}

exports.listar = async() =>{
    const query ={
        text:"SELECT * FROM USUARIO;"
    }
    const listagem = await pool.query(query);
    return listagem.rows;
}

exports.update = async (usuario) =>{

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

exports.apagar = async (id) =>{
    const query = {
        text:"delete from usuario where id = $1",
        values:[id]
    }
    const deletar = await pool.query(query);
    return deletar;

} 