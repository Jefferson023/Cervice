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

module.exports = router;