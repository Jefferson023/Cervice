const localStrategy = require("passport-local").Strategy;
const crypt = require('./crypt');
const pool = require('../Config/db.js');

module.exports = function(passport) {
    //procura um usuario
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        pool.query('SELECT * FROM tb_usuario WHERE email=$1', [email], (err, res_bd) => {
            if (res_bd.rows.length == 0){
                return done(null, false, {message: "Não existe nenhuma conta associada ao e-mail digitado"});
            }
            var usuario = res_bd.rows[0];
            if (!crypt.comparar_senha(senha, usuario.senha)){
                return done(null, false, {message: 'Senha incorreta'});
            }
            if (usuario.banido == true){
                return done(null, false, {message: 'Sua conta está banida do sistema'})
            }
            return done(null, usuario)
        });
       
    }));
   
    passport.serializeUser(function(usuario, done){
        done(null, usuario.id_usuario);
    })

    passport.deserializeUser(function(id, done) {
        pool.query('SELECT * FROM tb_usuario WHERE id_usuario=$1', [id], (err, res_bd) => {
            return done(null, res_bd.rows[0]);
        });
    })
}
