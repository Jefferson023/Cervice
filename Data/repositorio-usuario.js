const pool = require('./pool').pool;

const cadastrarUsuario = (usuario) => {   
    return new Promise((resolve, reject) => {
        let query = 'INSERT INTO tb_usuario (senha, email, nome) VALUES ($1, $2, $3)';
        let { senha, email, nome } = usuario;

        pool.query(query, [senha, email, nome])
            .then((res) => {
                resolve(res.rowCount > 0);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

const validarCredenciais = (credenciais) => {   
    return new Promise((resolve, reject) => {
        let query = 'SELECT email FROM tb_usuario WHERE email = $1 AND senha = $2';
        let { senha, email } = credenciais;
        pool.query(query, [email, senha])
            .then((res) => {
                resolve(res.rowCount > 0);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

module.exports = {
    cadastrarUsuario,
    validarCredenciais
};