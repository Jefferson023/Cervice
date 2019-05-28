class usuario {
    constructor(usuario){
        this.id_usuario = usuario.id_usuario;
        this.email =  usuario.email;
        this.nome =  usuario.nome;
        this.senha = usuario.senha;
        this.banido = usuario.banido;
    };
};

module.exports = usuario;