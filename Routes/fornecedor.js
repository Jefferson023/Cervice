const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const app = express();
const fornecedorController = require('../Controller/fornecedorController');
const servicoController = require('../Controller/servicoController.js');
const pool = require('../Config/db.js');
const autenticacao = require('../lib/autenticacaoUtil.js');

// tentativa de pegar os tipos de servicos

//configura bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// GET meus-servicos.
router.get('/fornecedor/meus-servicos', autenticacao.isAuthenticated,function (req, res) {

    fornecedorController.lista_servico_fornecedor(req,res);
});

// GET novo-servico
router.get('/fornecedor/novo-servico', autenticacao.isAuthenticated,function (req, res) {
    
    servicoController.lista_tipo_servico(req,res)
    
});
// Cadastrando o servico no BD FALTA VINCULAR AO USUARIO
router.post('/fornecedor/novo-servico', autenticacao.isAuthenticated,function(req, res){
  servicoController.cadastro_servico(req,res)  
})
function valor_id(valor)
{
    id = valor;
}
router.get('/fornecedor/minhas-entregas', autenticacao.isAuthenticated, function (req, res) {
    
    fornecedorController.lista_pedidos_fornecedor(req,res);
    
});
router.get('/fornecedor/minhas-entregas/att_status', autenticacao.isAuthenticated, function (req, res) {
    
    fornecedorController.lista_att_status(req,res);

    
});
router.get('/fornecedor/clickservico/um-servico', autenticacao.isAuthenticated, function (req, res) {
    
    servicoController.lista_produtos(req,res);
    
});

router.get('/fornecedor/clickservico/um-servico/editar', autenticacao.isAuthenticated, function (req, res) 
{
    servicoController.editar_servico(req,res);
    res.redirect('/fornecedor/clickservico/um-servico?id_servico='+res.req.query.id_servico);

});
router.get('/fornecedor/clickservico/um-servico/editar_produto', autenticacao.isAuthenticated, function (req, res) 
{
    servicoController.editar_produto(req,res);
    res.redirect('/fornecedor/clickservico/um-servico?id_servico='+res.req.query.id_servico);

}); 
router.get('/fornecedor/clickservico/um-servico/add_produto', autenticacao.isAuthenticated, function (req, res) 
{
    servicoController.add_produto(req,res);
   
});
router.get('/fornecedor/clickservico/um-servico/remover_produto', autenticacao.isAuthenticated, function (req, res) 
{
    servicoController.remover_produto(req,res);
    res.redirect('/fornecedor/clickservico/um-servico?id_servico='+res.req.query.id_servico);

});

router.get('/fornecedor/meus-servicos/remover-servico', autenticacao.isAuthenticated,function (req, res) {
    servicoController.remover_servico(req,res);
    

});

module.exports = router;