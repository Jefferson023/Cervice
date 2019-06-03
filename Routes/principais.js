const express = require('express');
const usuarioController = require('../Controller/usuarioController.js');
const router = express.Router();
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

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

// GET cadastro.
router.get('/cadastro', function (req, res) {
    if(req.user){
        res.redirect("/");
    }
    res.render('cadastro.ejs');
});

//página inicial
router.get('/', isAuthenticated, function (req, res){
    res.send("VOCÊ TÁ LOGADO");
});

//logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;