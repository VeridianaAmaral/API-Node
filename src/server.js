import app from "./app.js";
import dotenv from 'dotenv' ;

dotenv.config();

const porta = process.env.PORT_SERVER;

app.listen(porta, () => {
    console.log(`[SERVER] Executando na porta ${porta}`);
})