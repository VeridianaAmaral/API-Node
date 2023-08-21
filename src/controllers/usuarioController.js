const model = require("../models/usuarioModel");

exports.cadastro = async(req,res) => {
    try {
        const {nome , senha} = req.body;
        const usuario = {
            nome,
            senha
        }
        const resultado = await model.cadastro(usuario);
        console.log(resultado);
        res.status(201).json({
            message:"Inserido com sucesso",
            data:resultado.rows[0]
        })
    } catch (err) {
        res.status(400).json({
            error:"Não foi possivel inserir"
        })
        console.log(err)
    }
}

exports.listar = async (req, res) =>{
    try {
        const listagem = await model.listar();
        res.status(200).json({
            data:listagem
        })
    } catch (err) {
        res.status(400).json({
            error:"Não foi possivel listar"
        })
        console.log(err)
    }
}

exports.update = async(req,res) => {
    try {
        const {nome , senha, id} = req.body;
        const usuario = {
            nome,
            senha,
            id
        }
        const update = await model.update(usuario);
        res.status(200).json({
            data:update,
        })
    } catch (err) {
        res.status(400).json({
            error:"Não foi possivel atualizar"
        })
        console.log(err)
    }
}

exports.apagar = async (req, res) => {
    const {id} = req.params;
    try {
        const apg = await model.apagar(id);
        res.status(200).json({
            message:"Deletado com sucesso",
        })
    } catch (err) {
        res.status(400).json({
            error:"Não foi possivel deletar"
        })
        console.log(err)
    }
}