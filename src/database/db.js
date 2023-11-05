import database from "pg";
import dotenv from "dotenv";

dotenv.config();
const {Pool} = database;
//const conexaoDB = process.env.DB_URL;

const ssl = false;

//console.log(conexaoDB);

const pool = new Pool({
    ssl, 
    user:"postgres",
    password:"postgres",
    database:"rural-radical",
    port:5432,
    host:"localhost"
}) 

export default pool;