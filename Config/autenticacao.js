const localStrategy = require("passport-local").Strategy;
const crypt = require('./crypt');
require('../Controller/usuarioController.js');

module.exports = function(passport) {
    //procura um usuario
    passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) => {
        
    }));
}

//renomear mais tarde
passport.serializeUser(function(usuario, done){
    done(null, usuario.id);
})

//procura o usuario pelo id e retorna ele
passport.deserializeUser(function(id, done) {

})