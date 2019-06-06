const express = require('express');
const router = express.Router();
const usuarioController = require('../Controller/usuarioController.js');
const autenticacao = require('../lib/autenticacaoUtil.js');

// GET administrador/usuarios.
router.get('/administrador/usuarios', autenticacao.isAuthenticatedAdmin, function (req, res) {
    res.render('administrador/usuarios.ejs');
});

// GET administrador/condominio.
router.get('/administrador/condominio', autenticacao.isAuthenticatedAdmin, function (req, res) {
    res.render('administrador/condominio.ejs');
});

module.exports = router;