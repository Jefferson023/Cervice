const express = require('express');
const router = express.Router();
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET vitrine
router.get('/vitrine', function (req, res) {
    res.render('globais/vitrine.ejs');
});

// GET detalhes-produto
router.get('/vitrine/detalhes-produto', function (req, res) {
    res.render('globais/detalhes-produto.ejs');
});

// GET meus-pedidos
router.get('/meus-pedidos', function (req, res) {
    res.render('globais/meus-pedidos.ejs');
});

// GET meus-pedidos
router.get('/perfil', function (req, res) {
    res.render('globais/perfil.ejs');
});
module.exports = router;