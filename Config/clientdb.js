//configurações para se conectar ao banco  de dados como client
const {Client} = require('pg');
if (process.env.NODE_ENV === "production"){
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true, 
        statement_timeout: 2000
    });
    client.connect();
    module.exports = client;
}else{
    const client = new Client({ssl: true, statement_timeout: 2000});
    require('dotenv').config();
    client.connect();
    module.exports = client;
}
