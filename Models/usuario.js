class usuario {
    constructor(){
        this.id_usuario = "";
        this.email = "";
        this.nome = "";
        this.senha = "";
        this.banido = false;
    };
    set id_usuario(id){
        this.id_usuario = id;
    }
};

module.exports = usuario;