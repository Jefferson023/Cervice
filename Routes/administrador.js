const express = require('express');
const router = express.Router();
const usuarioController = require('../Controller/usuarioController.js');
const autenticacao = require('../lib/autenticacaoUtil.js');

// GET administrador/usuarios.
router.get('/administrador/usuarios', autenticacao.isAuthenticatedAdmin, function (req, res) {
    usuarioController.usuarios_condominio(req, res);
});

router.get('/administrador/usuarios/desbanir', autenticacao.isAuthenticatedAdmin, function (req, res) {
    //validar
    usuarioController.desbanir(req, res);
});

router.get('/administrador/usuarios/banir', autenticacao.isAuthenticatedAdmin, function (req, res) {
    //validar
    usuarioController.banir(req, res);
});

// GET administrador/condominio.
router.get('/administrador/condominio', autenticacao.isAuthenticatedAdmin, function (req, res) {
    res.render('administrador/condominio.ejs');
});

module.exports = router;