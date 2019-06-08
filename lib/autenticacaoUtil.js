const pool = require('../Config/db.js');
module.exports.isAuthenticated = function (req, res, next){
    if (req.user && req.user.banido == false){
        return next();
    }  
    res.redirect('/logout');
}
module.exports.isAuthenticatedAdmin = function(req, res, next) {
    if (!req.user){
        res.redirect('/login')
    }
    pool.query("SELECT * FROM tb_usuario U JOIN tb_administrador_condominio A ON U.id_usuario = A.id_usuario WHERE U.id_usuario=$1", [req.user.id_usuario], (err, res_bd) => {
        if (err) {
            //server internal error page
            console.log(err)
        }
        if (res_bd.rows.length == 0){
            res.redirect('/')
        }else {
            return next();
        }
    })
}