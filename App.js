//carregando módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const app = express();
require('./Config/autenticacao.js')(passport);

//configurações principais do express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/Views');
app.use(express.static('Public'));
app.use(helmet());
app.use(session({secret: "cerviceimd", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    next();
});
//configura bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurações de rotas
app.use('/', require('./Routes/nao_autenticado.js'));

//configura a porta do servidor
app.listen(process.env.PORT || 3000, function()
{
    console.log('Rodando na porta ' + (process.env.PORT || 3000));
});