const express = require('express');
const router = express.Router();
const autenticacao = require('../lib/autenticacaoUtil.js');
const servicoController = require('../Controller/servicoController.js');
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
    //TODO
});

// GET detalhes-produto
router.get('/perfil', function (req, res) {
    res.render('globais/perfil.ejs');
});

module.exports = router;