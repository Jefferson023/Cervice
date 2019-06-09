const pool = require('../Config/db.js');
const client = require('../Config/clientdb.js');
const crypt = require('../Config/crypt.js');

module.exports.novo_usuario = function(req, res) {
    values = [crypt.criptografar(req.body.senha), req.body.email, req.body.nome]
    client.connect();
    client.query('BEGIN', (err) => {
        if (err){
            console.log(err)
            return;
        }
        client.query("INSERT INTO tb_usuario VALUES (DEFAULT, $1, $2, $3, false) RETURNING id_usuario", values, (err2, res_bd)=>{
            if (err2){
                console.log(err2)
                client.query('ROLLBACK');
                return;
            }
            client.query("SELECT * FROM tb_condominio WHERE codigo_acesso=$1", [req.body.codigo], (err3, res_bd2)=>{
                if (err3){
                    console.log(err3)
                    client.query('ROLLBACK');
                    return;
                }
                values = [res_bd.rows[0].id_usuario, res_bd2.rows[0].id_condominio, req.body.numero, req.body.bloco]
                client.query("INSERT INTO tb_condominio_usuario VALUES ($1, $2, $3, $4)", values, (err4)=>{
                    if (err4){
                        console.log(err4)
                        client.query('ROLLBACK');
                        return;
                    }
                    client.query('COMMIT');
                    client.end();
                });
            });
        });
    });
    req.flash("success","Sua conta foi criada. Entre utilizando seu email e senha nos campos abaixo");
    res.redirect('/login');
}
module.exports.usuarios_condominio = function (req, res) {
    query_string = 'SELECT U.nome, U.email, U.banido, C.nome AS condominio, UC.numero_casa, UC.bloco_andar FROM'
    query_string = query_string + ' tb_usuario U JOIN tb_condominio_usuario UC ON U.id_usuario = UC.id_usuario JOIN';
    query_string = query_string + ' tb_condominio C ON UC.id_condominio = C.id_condominio WHERE C.id_condominio IN';
    query_string = query_string + ' (SELECT AC.id_condominio FROM tb_usuario U2 JOIN tb_administrador_condominio AC ON';
    query_string = query_string + ' U2.id_usuario=AC.id_usuario WHERE U2.id_usuario=$1)';
    pool.query(query_string, [req.user.id_usuario], (err, res_bd) => {
        if (err){
            //internal server error page
            console.log(err);
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

module.exports.verifica_disponibilidade_email = function (req, res){
    pool.query("SELECT * FROM tb_usuario WHERE email=$1", [req.query.email], (err, res_bd) =>{
        if (err){
            //internal server error page
        }
        if (res_bd.rows.length >= 1){
            res.send("false");
        }else{
            res.send("true");
        }
    });
}

module.exports.banir = function(req, res){
    query_string = "SELECT * FROM (tb_usuario U JOIN tb_administrador_condominio A ON U.id_usuario = A.id_usuario)"
    query_string = query_string + " WHERE U.id_usuario=$1 AND A.id_condominio IN (SELECT id_condominio FROM"
    query_string = query_string + " (tb_usuario U2 JOIN tb_condominio_usuario UC ON U2.id_usuario=UC.id_usuario)"
    query_string = query_string + " WHERE U2.email=$2)"
    pool.query(query_string, [req.user.id_usuario, req.query.email], (err, res_bd) =>{
        if (err){
            console.log(err);
            return;
        }
        if (res_bd.rows.length == 0){
            return;
        }
        pool.query("UPDATE tb_usuario SET banido=true WHERE email=$1", [req.query.email], (err) =>{
        });
    });
    res.redirect('/administrador/usuarios');
}

module.exports.desbanir = function(req, res){
    query_string = "SELECT * FROM (tb_usuario U JOIN tb_administrador_condominio A ON U.id_usuario = A.id_usuario)"
    query_string = query_string + " WHERE U.id_usuario=$1 AND A.id_condominio IN (SELECT id_condominio FROM"
    query_string = query_string + " (tb_usuario U2 JOIN tb_condominio_usuario UC ON U2.id_usuario=UC.id_usuario)"
    query_string = query_string + " WHERE U2.email=$2)"
    pool.query(query_string, [req.user.id_usuario, req.query.email], (err, res_bd) =>{
        if (err){
            console.log(err);
            return;
        }
        if (res_bd.rows.length == 0){
            return;
        }
        pool.query("UPDATE tb_usuario SET banido=false WHERE email=$1", [req.query.email], (err) =>{
        });
    });
}