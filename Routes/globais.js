const express = require('express');
const router = express.Router();
const autenticacao = require('../lib/autenticacaoUtil.js');
const servicoController = require('../Controller/servicoController.js');
const usuarioController = require('../Controller/usuarioController.js');

// GET catalogo-servicos
router.get('/catalogo-servicos', autenticacao.isAuthenticated, function (req, res) {
    servicoController.listar_categorias(req, res);
});

router.get("/catalogo-servicos/servicos", autenticacao.isAuthenticated,function (req, res){
    //validar os dados do req
    servicoController.listar_servicos(req, res);
});

// GET detalhes-produto
router.get('/catalogo-servicos/detalhes-servico', autenticacao.isAuthenticated,function (req, res) {
    servicoController.detalhe_servico(req, res, "globais/detalhes-servico.ejs");
});

//GET solicitação de serviço
router.get('/catalogo-servicos/detalhes-servico/solicitar', autenticacao.isAuthenticated,function (req, res) {
    servicoController.detalhe_servico(req, res, "globais/solicitar-servico.ejs");
});

router.post('/catalogo-servicos/detalhes-servico/solicitar', autenticacao.isAuthenticated,function (req, res) {
    //validar
    if (Object.keys(req.body).length > 2){
        servicoController.novo_pedido_produtos(req, res);
    }else{
        servicoController.novo_pedido(req, res);
    }
});

router.get('/catalogo-servicos/detalhes-servico/solicitar/produtos', autenticacao.isAuthenticated, function (req, res){
    //valida
    servicoController.listar_produtos(req, res);
});

// GET meus-pedidos
router.get('/meus-pedidos', autenticacao.isAuthenticated, function (req, res) {
    usuarioController.lista_pedidos(req,res);
});
// GET detalhe-pedido
router.get('/meus-pedidos/detalhe-pedido', autenticacao.isAuthenticated, function (req, res) {
    res.render('globais/um-pedido.ejs');
});

// GET perfil
router.get('/perfil',  autenticacao.isAuthenticated, function (req, res) {
    usuarioController.infoperfil(req,res);
});

//POST atializar-perfil
router.post('/atualizar-perfil',  autenticacao.isAuthenticated, function (req, res) {
    usuarioController.atualizar_perfil(req, res);
});

module.exports = router;
