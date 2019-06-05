const express = require('express');
const router = express.Router();
const passport = require('passport');
const usuarioController = require('../Controller/usuarioController.js');

//precisa mudar e verificar se é admin
function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET administrador/usuarios.
router.get('/administrador/usuarios', isAuthenticated, function (req, res) {
    res.render('administrador/usuarios.ejs');
});

// GET administrador/condominio.
router.get('/administrador/condominio', isAuthenticated, function (req, res) {
    res.render('administrador/condominio.ejs');
});

module.exports = router;