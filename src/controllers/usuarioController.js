import model from "../models/usuarioModel.js";

const validar = (usuario) => {
  let errors = [];
  for (const key in usuario) {
    if (usuario.hasOwnProperty(key)) {
      if (
        usuario[key] === null ||
        usuario[key] === undefined ||
        usuario[key] === ""
      ) {
        errors.push(`${key} esta incorreto`);
      }
    }
    if (errors.length > 0) {
      throw new Error(errors);
    }
  }
};

class Controller {
  cadastro = async (req, res) => {
    try {
      //Desestrutura o req.body para capturar os dados
      const {
        nome,
        email,
        senha,
        data_nascimento,
        cep,
        uf,
        cidade,
        bairro,
        logradouro,
        numero,
        consumidor,
      } = req.body;
      const usuario = {
        nome,
        email,
        senha,
        data_nascimento,
        cep,
        uf,
        cidade,
        bairro,
        logradouro,
        numero,
        consumidor,
      };
      //valida o objeto do usuario para garantir que todos os dados foram preenchidos
      validar(usuario);
      //Envia o objeto para a model e aguarda a resposta
      const resultado = await model.cadastro(usuario);
      console.log(
        resultado.rowCount > 0 ? "Inserido com sucesso" : "Sem alteração"
      );
      res.status(201).json({
        message: "Inserido com sucesso",
        data: resultado.rows[0],
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
      console.log(err);
    }
  };

  listar = async (req, res) => {
    const {tipo} = req.params;
    try {
      const listagem = await model.listar(tipo);
      res.status(200).json({
        data: listagem,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
      console.log(err);
    }
  };

  update = async (req, res) => {
    try {
      const { nome, senha, id } = req.body;
      const usuario = {
        nome,
        senha,
        id,
      };
      const update = await model.update(usuario);
      res.status(200).json({
        data: update,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
      console.log(err);
    }
  };

  apagar = async (req, res) => {
    const { id } = req.params;
    try {
      const apg = await model.apagar(id);
      res.status(200).json({
        message: "Deletado com sucesso",
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
      console.log(err);
    }
  };
}

export default new Controller();
