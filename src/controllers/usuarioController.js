import model from "../models/usuarioModel.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js";

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
      let {
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

      const saltRounds = 10;
      senha = await bcrypt.hash(senha, saltRounds);

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

  authenticateUser = async (req, res) => {
  
    try {
      const {tipo, email, senha } = req.body;
      console.log(tipo, email, senha)
      const user = await model.findUserByUsername(tipo, email);
    console.log(user);
      if (!user) {
        return res.status(401).send({
          "result": false,
          "content": "Usuário ou senha inválido",
      });
      }
  
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
  
      if (!isPasswordValid) {
        res.status(401).send({
          "result": false,
          "content": "Usuário ou senha inválido",
      });
      }
  
      const payload = {id: user.id, tipo: tipo};
  
      const token = generateToken(payload);
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


}

export default new Controller();
