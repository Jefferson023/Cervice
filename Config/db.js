//configurações para se conectar ao banco  de dados
const {Pool} = require('pg');
if (process.env.NODE_ENV === "production"){
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
    module.exports = pool;
}else{
    const pool = new Pool({ssl: true});
    require('dotenv').config();
    module.exports = pool;
}