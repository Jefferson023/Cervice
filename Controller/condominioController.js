const pool = require('../Config/db.js');

module.exports.verifica_codigo_condominio = function (req, res){
    var codigo_condominio = req.query.cod_condominio
    pool.query("SELECT * FROM tb_condominio WHERE codigo_acesso=$1", [codigo_condominio], (err, res_bd) => {
        if (err){
            //internal server error page
            throw err;
        }
        if (res_bd.rows.length != 1){
            res.send("false");
        }else{
            res.send("true");
        }
    });
}