const express = require('express');
const usuarioController = require('../Controller/usuarioController.js');
const condominioController = require('../Controller/condominioController.js');
const router = express.Router();
const passport = require('passport');
const autenticacao = require('../lib/autenticacaoUtil.js');

// GET login.
router.get('/login', function (req, res) {
    if (req.user){
        res.redirect("/");
    }
    res.render('login.ejs');
});

// POST login
router.post('/login', function(req, res, next){
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })(req, res, next);
});

//POST cadastro
router.post('/cadastro', function(req, res){
    if(req.user){
        res.redirect("/");
    }
    //verifica por sql injection e se os dados estão corretos
    usuarioController.novo_usuario(req, res);
});

// GET cadastro.
router.get('/cadastro', function (req, res) {
    if(req.user){
        res.redirect("/");
    }
    res.render('cadastro.ejs');
});

router.get('/cadastro/condominio_disponivel', function (req, res){
    //valida 
    condominioController.verifica_disponibilidade_codigo_condominio(req, res);
});

router.get('/cadastro/email_disponivel', function (req, res){
    //valida 
    usuarioController.verifica_disponibilidade_email(req, res);
});

//página inicial
router.get('/', autenticacao.isAuthenticated, function (req, res){
    res.redirect('/catalogo-servicos');
});

//logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;