const express = require('express');
const router = express.Router();
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET meus-servicos.
router.get('/fornecedor/meus-servicos', function (req, res) {
    res.render('fornecedor/meus-servicos.ejs');
});

// GET novo-servico.
router.get('/fornecedor/novo-servico', function (req, res) {
    res.render('fornecedor/novo-servico.ejs');
});

module.exports = router;