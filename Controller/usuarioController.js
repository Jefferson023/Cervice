const usuario = require('../Models/usuario.js');
const pool = require('../Config/db.js');
const crypt = require('../Config/crypt.js');

module.exports.findByID = function (id){
    user = new usuario();
    return user;
}

module.exports.POST_login = function(req, res){
    var email = req.body.email;
    var senha = req.body.senha;
    var user = null;

    pool.query('SELECT * FROM tb_usuario WHERE email=$1', [email], (err, res_bd) => {
        if (res_bd.rows.length == 0){
            req.flash('error', 'O e-mail digitado não pertence a nenhuma conta registrada.');
            res.redirect('/login');
        }else {
            user = new usuario(res_bd.rows[0]);
            
        }
    })
}