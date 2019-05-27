const bcrypt = require('bcrypt');
module.exports.criptografar = function (senha){
    return bcrypt.hashSync(senha, 12); 
}
module.exports.comparar_senha = function (senha, hash){
    return bcrypt.compareSync(senha, hash);
}