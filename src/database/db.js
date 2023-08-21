const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

//const conexaoDB = process.env.DB_URL;

const ssl = false;

//console.log(conexaoDB);

const pool = new Pool({
    ssl, 
    user:"postgres",
    password:"postgres",
    database:"financaNode",
    port:5432,
    host:"localhost"
}) 

module.exports = pool;