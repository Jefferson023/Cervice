const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

//configurações principais do express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.use(express.static('Public'));
app.use(helmet());

//configura bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurações de rotas
app.use('/', require('./Routes/notAuth.js'));

//configura a porta do servidor
app.listen(process.env.PORT || 3000, function()
{
    console.log('Rodando na porta ' + (process.env.PORT || 3000));
});