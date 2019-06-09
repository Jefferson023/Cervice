const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const app = express();
const fornecedorController = require('../Controller/fornecedorController');
const servicoController = require('../Controller/servicoController.js');
const pool = require('../Config/db.js');
var tipo_servico =  [];
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
    fornecedorController.lista_tipo_servico(res)
});

// GET novo-servico
router.get('/fornecedor/novo-servico', function (req, res) {
    servicoController.lista_tipo_servico(res)
    
});
// Cadastrando o servico no BD FALTA VINCULAR AO USUARIO
router.post('/fornecedor/novo-servico',function(req, res){
  servicoController.cadastro_servico(req,res)  
})


module.exports = router;