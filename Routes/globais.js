const express = require('express');
const router = express.Router();
const passport = require('passport');
const usuarioController = require('../Controller/usuarioController.js');
const autenticacao = require('../lib/autenticacaoUtil.js');

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET catalogo-servicos
router.get('/catalogo-servicos', function (req, res) {
    res.render('globais/catalogo-servicos.ejs');
});

// GET detalhes-produto
router.get('/catalogo-servicos/detalhes-produto', function (req, res) {
    res.render('globais/detalhes-produto.ejs');
});

// GET meus-pedidos
router.get('/meus-pedidos', function (req, res) {
    res.render('globais/meus-pedidos.ejs');
});
// GET detalhe-pedido
router.get('/meus-pedidos/detalhe-pedido', function (req, res) {
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