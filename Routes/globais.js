const express = require('express');
const router = express.Router();
const passport = require('passport');

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

module.exports = router;