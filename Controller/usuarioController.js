const pool = require('../Config/db.js');
const crypt = require('../Config/crypt.js');

module.exports.usuarios_condominio = function (req, res) {
    //alterar pra botar o endereco
    query_string = 'SELECT U.nome, U.email, U.banido, C.nome AS condominio, UC.numero_casa, UC.quadra_andar FROM'
    query_string = query_string + ' tb_usuario U JOIN tb_condominio_usuario UC ON U.id_usuario = UC.id_usuario JOIN';
    query_string = query_string + ' tb_condominio C ON UC.id_condominio = C.id_condominio WHERE C.id_condominio IN';
    query_string = query_string + ' (SELECT AC.id_condominio FROM tb_usuario U2 JOIN tb_administrador_condominio AC ON';
    query_string = query_string + ' U2.id_usuario=AC.id_usuario WHERE U2.id_usuario=$1)';
    pool.query(query_string, [req.user.id_usuario], (err, res_bd) => {
        if (err){
            //internal server error page
        }
        ativos = [];
        banidos = [];
        for (var i = 0; i < res_bd.rows.length; i++){
            if (res_bd.rows[i].banido == false){
                ativos.push(res_bd.rows[i])
            }else{
                banidos.push(res_bd.rows[i])
            }
        }
        res.render('administrador/usuarios.ejs', {usuarios_ativos: ativos, usuarios_banidos: banidos});
    });
}