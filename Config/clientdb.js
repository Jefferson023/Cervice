//configurações para se conectar ao banco  de dados como client
const {Client} = require('pg');
if (process.env.NODE_ENV === "production"){
    const pool = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
    module.exports = client;
}else{
    const client = new Client({ssl: true});
    require('dotenv').config();
    module.exports = client;
}