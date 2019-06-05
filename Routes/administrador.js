const express = require('express');
const router = express.Router();
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET administrador/usuarios.
router.get('/administrador/usuarios', function (req, res) {
    res.render('administrador/usuarios.ejs');
});

// GET administrador/condominio.
router.get('/administrador/condominio', function (req, res) {
    res.render('administrador/condominio.ejs');
});

module.exports = router;