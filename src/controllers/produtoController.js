import model from "../models/produtoModel.js";
import validar from "../utils/validar.js";

class Controller {
  cadastro = async (req, res) => {
    try {
      //Desestrutura o req.body para capturar os dados
      const {
        nome,
        categoria,
        imagem
      } = req.body;
      const produto = {
        nome,
        categoria,
        imagem
      };
      //valida o objeto do usuario para garantir que todos os dados foram preenchidos
      validar(produto);
      //Envia o objeto para a model e aguarda a resposta
      const resultado = await model.cadastro(produto);
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
    try {
      const listagem = await model.listar();
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

}

export default new Controller();