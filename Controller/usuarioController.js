const usuario = require('../Models/usuario.js');
const pool = require('../Config/db.js');
const crypt = require('../Config/crypt.js');

module.exports.POST_login = function(req, res){
    var email = req.body.email;
    var senha = req.body.senha;

    pool.query('SELECT * FROM tb_usuario WHERE email=$1', [email], (err, res) => {
        
    })
    res.redirect('/login');
}