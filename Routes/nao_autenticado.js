const express = require('express');
const usuarioController = require('../Controller/usuarioController.js');
const router = express.Router();

// GET login.
router.get('/login', function (req, res) {
    res.render('login.ejs');
});

// POST login
router.post('/login', function(req, res){
    usuarioController.POST_login(req, res);
});

// GET cadastro.
router.get('/cadastro', function (req, res) {
    res.render('cadastro.ejs');
});

router.get('/', function (req, res){
    res.send("VOCÊ TÁ LOGADO");
});
module.exports = router;