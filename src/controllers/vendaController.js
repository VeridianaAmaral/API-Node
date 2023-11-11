import model from "../models/vendaModel.js";
import validar from "../utils/validar.js";

class Controller {
  cadastro = async (req, res) => {
    try {
      const consumidor_id = req.user.id;
      const { produtor_id, valor, qtt, anuncio_id } = req.body;
      const status = "Preparando";
      const venda = {
        consumidor_id,
        produtor_id, status, valor, qtt, anuncio_id
      };
      //valida o objeto do usuario para garantir que todos os dados foram preenchidos
      validar(venda);
      //Envia o objeto para a model e aguarda a resposta
      const resultado = await model.cadastro(venda);
      console.log(
        resultado.rowCount > 0 ? "Inserido com sucesso" : "Sem alteração"
      );
      res.status(201).json({
        message: "Inserido com sucesso",
        data: venda,
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
      const listagem = await model.listar(req.user.id, req.body.status);
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
