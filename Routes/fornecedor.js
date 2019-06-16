const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const app = express();
const fornecedorController = require('../Controller/fornecedorController');
const servicoController = require('../Controller/servicoController.js');
const pool = require('../Config/db.js');
// tentativa de pegar os tipos de servicos

//configura bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET meus-servicos.
router.get('/fornecedor/meus-servicos', function (req, res) {
    fornecedorController.lista_servico_fornecedor(req,res)
});

// GET novo-servico
router.get('/fornecedor/novo-servico', function (req, res) {
    
    servicoController.lista_tipo_servico(req,res)
    
});
// Cadastrando o servico no BD FALTA VINCULAR AO USUARIO
router.post('/fornecedor/novo-servico',function(req, res){
    console.log('0');
  servicoController.cadastro_servico(req,res)  
})
function valor_id(valor)
{
    id = valor;
}
router.get('/fornecedor/minhas-entregas', function (req, res) {
    
    res.render('fornecedor/minhas-entregas.ejs')
    
});
router.get('/fornecedor/clickservico/um-servico', function (req, res) {
    
    res.render('fornecedor/um-servico.ejs')
    
});

router.get('/fornecedor/minhas-entregas/info-servico', function (req, res) {
    
    res.render('fornecedor/info-servico.ejs')
    
});

module.exports = router;