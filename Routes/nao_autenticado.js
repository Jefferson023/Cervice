const express = require('express');
const usuarioController = require('../Controller/usuarioController.js');
const router = express.Router();
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.user.authenticated)
        return next();
    res.redirect('/login');
}

// GET login.
router.get('/login', function (req, res) {
    res.render('login.ejs');
});

// POST login
router.post('/login', passport.authenticate('local', { successRedirect: '/', 
    failureRedirect: '/login', failureFlash: true }));

// GET cadastro.
router.get('/cadastro', function (req, res) {
    res.render('cadastro.ejs');
});

router.get('/', isAuthenticated, function (req, res){
    res.send("VOCÊ TÁ LOGADO");
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;