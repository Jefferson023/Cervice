const express = require('express');
const router = express.Router();

// GET login.
router.get('/login', function (req, res) {
    res.render('login.ejs');
})

// GET cadastro.
router.get('/cadastro', function (req, res) {
    //pega o código do condominio e substituti
    codigo = req.query['codigo']
    res.render('cadastro.ejs', {codigo_condominio: codigo});
})

module.exports = router;