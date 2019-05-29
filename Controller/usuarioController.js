const pool = require('../Config/db.js');
const crypt = require('../Config/crypt.js');
var usuario = null;
module.exports.findByID = function (id){
    pool.query('SELECT * FROM tb_usuario WHERE id_usuario=$1', [id], (err, res_bd) => {
        if (res_bd.rows.length == 0) {
            return null;
        }else {
            return res_bd.rows[0];
        }       
    });    
};

module.exports.findByEmail = function(email){
    pool.query('SELECT * FROM tb_usuario WHERE email=$1', [email], (err, res_bd) => {
        if (res_bd.rows.length == 1){
            usuario = res_bd.rows[0];
        }
    });

    return usuario;
}