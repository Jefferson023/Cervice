const express = require('express');
const router = express.Router();

// GET login.
router.get('/login', function (req, res) {
    res.render('login.ejs');
})

// GET cadastro.
router.get('/cadastro', function (req, res) {
    res.render('cadastro.ejs');
})

module.exports = router;