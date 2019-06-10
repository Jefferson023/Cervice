//configurações para se conectar ao banco  de dados
const {Pool} = require('pg');
if (process.env.NODE_ENV === "production"){
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true, 
        statement_timeout: 2000
    });
    module.exports = pool;
}else{
    const pool = new Pool({ssl: true, statement_timeout: 2000});
    require('dotenv').config();
    module.exports = pool;
}