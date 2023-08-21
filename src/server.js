const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const porta = process.env.PORT_SERVER;

app.listen(porta, () => {
    console.log("Cheguei");
})