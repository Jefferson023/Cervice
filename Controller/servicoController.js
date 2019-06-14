const pool = require('../Config/db.js');
const client = require('../Config/clientdb.js');
const express = require('express');
const app = express();
var tipo_servico = [];
module.exports.lista_tipo_servico = function(req, res) {
    if (!req.user) {
        console.log('nao  logado');
        res.redirect('/login');
        return;
    }
    pool.query('SELECT * FROM tb_tipo_servico', (err, res_bd) => {


        if (err) {
            console.log(err)
        } else {
            valor_tipo(res_bd.rows)
            console.log(tipo_servico)
        }
        res.render('fornecedor/novo-servico.ejs', {
            tipo_servico: tipo_servico
        });
    });
}

function valor_tipo(valor) {
    tipo_servico = valor
}
module.exports.cadastro_servico = function(req, res) {
    if (!req.user) {
        console.log('nao logado');
        res.redirect('/login');
    }
    if (req.body.titulo.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('titulo não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    if (req.body.hora.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('hora não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    var id_fun = req.user.id_usuario;
    console.log('0.9');
    client.connect();
    client.query('BEGIN', (err) => {
        console.log('1');
        if (err) {
            console.log(err, 'err');
            return;
        } else {
            var values1 = [req.body.titulo, req.body.tipo, req.body.hora, req.body.descricao];
            var query_s = 'INSERT INTO tb_servico(nome,hora_abertura,abertura_status,id_tipo,banido,descricao) values '
            query_s = query_s + '($1,$3,False,$2,False,$4) RETURNING id_servico'
            client.query(query_s, values1, (err1, res_bd) => {
                console.log('2');
                if (err1) {
                    console.log(err1);
                    client.query('ROLLBACK');
                    return;
                } else {
                    var id = res_bd.rows[0].id_servico;

                    console.log(id_fun, 'esse')
                    client.query('INSERT INTO tb_fornecedor_servico(id_servico,id_usuario) values ($1,$2)', [id, id_fun], (err2, res_bd2) => {
                        if (err2) {
                            console.log(err2, 'dentro');
                            client.query('ROLLBACK');
                            return;
                        } else {
                            client.query('SELECT tu.id_usuario ,tcu.id_condominio from tb_usuario AS tu inner join tb_condominio_usuario AS tcu ON tu.id_usuario = tcu.id_usuario', (err3, res_bd3) => {
                                if (err3) {
                                    console.log(err3, 'dentro');
                                    client.query('ROLLBACK');
                                    return;
                                } else {
                                    var id_cond = res_bd3.rows[0].id_condominio;
                                    client.query('INSERT INTO tb_condominio_servicos(id_servico,id_condominio) values ($1,$2)', [id, id_cond], (err4, res_bd4) => {
                                        if (err4) {
                                            console.log(err4, 'dentro');
                                            client.query('ROLLBACK');
                                            return;
                                        } else {
                                            client.query('COMMIT', (err) => {
                                                if (err) {
                                                    client.query('ROLLBACK');
                                                } else {
                                                    client.end();
                                                }
                                            }) 
                                        }
                                    });
                                }
                            });
                        }
                    });
                };
            });
        };
    });
    console.log('aq');
    req.flash("success", "Servico" + req.body.titulo + "criado com sucesso");
    res.redirect('/fornecedor/novo-servico');
}

module.exports.listar_servicos = function (req, res){
    var nome = req.query.nome_servico + '%';
    var categoria = req.query.categoria + '%';
    var query_string = "SELECT S.id_servico, S.nome, S.descricao, S.hora_abertura, S.hora_fechamento, TS.nome AS categoria, TS.link"
    query_string = query_string + " FROM tb_servico S JOIN tb_tipo_servico TS ON S.id_tipo = TS.id_tipo";
    query_string = query_string + " WHERE S.nome LIKE $1 AND TS.nome LIKE $2 AND S.banido=false";
    pool.query(query_string, [nome, categoria], (err, res_bd) =>{
        if (err){
            res.sendStatus(500);
        }else{
            res.send(res_bd.rows);
        }
    });
}
module.exports.listar_categorias = function (req, res){
    pool.query("SELECT nome FROM tb_tipo_servico", (err, res_bd) => {
        if (err){
            res.redirect(500, '500.ejs');
        }else{
            categorias = []
            res_bd.rows.forEach(categoria => {
                categorias.push(categoria.nome);
            })
            res.render('globais/catalogo-servicos.ejs', {categorias: categorias});
        }
    });
}