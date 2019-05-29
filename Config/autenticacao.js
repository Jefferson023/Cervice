const localStrategy = require("passport-local").Strategy;
const crypt = require('./crypt');
const usuarioController = require('../Controller/usuarioController.js');

module.exports = function(passport) {
    //procura um usuario
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        var usuario = usuarioController.findByEmail(email);
        console.log(usuario)
        if (!usuario){
            console.log("email, falhou");
            return done(null, false, {message: "Não existe nenhuma conta associada ao e-mail digitado"});
        }
        if (!comparar_senha(senha, usuario.senha)){
            console.log("senha, falhou");
            return done(null, false, {message: 'Senha incorreta'});
        }
        console.log("nada de errrado");
        return done(null, usuario)
        
    }));

    //renomear mais tarde
    passport.serializeUser(function(usuario, done){
        done(null, usuario.id_usuario);
    })

    //procura o usuario pelo id e retorna ele
    passport.deserializeUser(function(id, done) {
        return done(null, findByID(id))
    })
}