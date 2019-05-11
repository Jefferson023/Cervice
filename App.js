const express = require('express');
const bodyParse = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/Views');
app.use('/static', express.static(__dirname + '/Public'));

//configura bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configura a porta do servidor
app.listen(process.env.PORT || 3000, function()
{
    console.log('Rodando na porta ' + (process.env.PORT || 3000));
});