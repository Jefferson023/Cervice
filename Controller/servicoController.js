const pool = require('../Config/db.js');
const client = require('../Config/clientdb.js');
const express = require('express');
const app = express();
const format = require("pg-format");
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
    var query_string = `SELECT S.id_servico, S.nome, S.descricao, S.hora_abertura, S.hora_fechamento, 
    TS.nome AS categoria, TS.link FROM tb_servico S JOIN tb_tipo_servico TS ON S.id_tipo = TS.id_tipo 
    JOIN tb_condominio_servicos CS ON S.id_servico = CS.id_servico JOIN tb_condominio_usuario UC ON
    CS.id_condominio = UC.id_condominio WHERE S.nome LIKE $1 AND TS.nome LIKE $2 AND S.banido=false
    AND UC.id_usuario = $3`
    pool.query(query_string, [nome, categoria, req.user.id_usuario], (err, res_bd) =>{
        if (err){
            res.sendStatus(500);
        }else{
            res.send(res_bd.rows);
        }
    });
}

module.exports.detalhe_servico = function(req, res, pagina){
    var query_string = `SELECT U.nome, U.email, S.descricao AS descricao_servico,S.id_servico, S.hora_abertura, 
    S.hora_fechamento, S.nome AS nome_servico, TS.nome as categoria, TS.link, UC.bloco_andar, UC.numero_casa, 
    P.descricao AS descricao_produto, P.disponivel AS estoque_disponivel, P.nome AS nome_produto, P.preco, 
    P.id_produto FROM tb_fornecedor_servico FS JOIN tb_usuario U ON FS.id_usuario = U.id_usuario
    JOIN tb_servico S ON FS.id_servico = S.id_servico JOIN tb_condominio_usuario UC ON U.id_usuario = UC.id_usuario 
    JOIN tb_tipo_servico TS ON S.id_tipo = TS.id_tipo LEFT JOIN tb_produto P ON S.id_servico = P.id_servico
    WHERE S.id_servico = $1`;
    pool.query(query_string, [req.query.servico], (err, res_bd) =>{
        if (err){
            res.redirect(500, '500.ejs');
        }else{
            res.render(pagina, {rows: res_bd.rows});
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

module.exports.novo_pedido = function (req, res){
    var query_string = `SELECT S.id_servico, P.id_produto FROM tb_servico S LEFT JOIN tb_produto P 
    ON S.id_servico = P.id_servico WHERE S.id_servico = $1`
    pool.query(query_string, [req.body.id_servico], (err, res_bd) =>{
        if (err || res_bd.rows.length > 1 || res_bd.rows[0].id_produto != null){
            res.render('500.ejs');
        }else{
            var query_string2 = "INSERT INTO tb_pedido VALUES (DEFAULT, $1, $2, 1, $3)";
            pool.query(query_string2, [req.user.id_usuario, req.body.id_servico, req.body.observacoes], (err) =>{
                if (err){
                    res.render('500.ejs');
                }else{
                    //mudar pra meus pedidos
                    res.redirect('/');
                }
            });
        }
    });
}
module.exports.novo_pedido_produtos = function (req, res){
    var query_string = `SELECT S.id_servico, P.id_produto FROM tb_servico S LEFT JOIN tb_produto P 
    ON S.id_servico = P.id_servico WHERE S.id_servico = $1`;
    client.connect();
    client.query(query_string, [req.body.id_servico], (err, res_bd) =>{
        if (err || (res_bd.rows.length == 1 && res_bd.rows[0].id_produto == null)){
            res.render('500.ejs');
        }else{
            client.query("BEGIN", (err2)=>{
                if (err2){
                    client.query('ROLLBACK');
                    res.render('500.ejs');
                    return;
                }else{
                    var query_string2 = "INSERT INTO tb_pedido VALUES (DEFAULT, $1, $2, 1, $3) RETURNING id_pedido";
                    client.query(query_string2, [req.user.id_usuario, req.body.id_servico, req.body.observacoes], (err3, res_bd2) =>{
                        if (err3){
                            client.query('ROLLBACK');
                            res.render('500.ejs');
                            return;
                        }else{
                            var produtos = req.body;
                            delete produtos.id_servico;
                            delete produtos.observacoes;
                            var string = []
                            Object.keys(produtos).forEach(key =>{
                                string.push([key, res_bd2.rows[0].id_pedido, produtos[key]]);   
                            })
                            var query_string3 = format("INSERT INTO tb_produto_pedido VALUES %L", string);
                            client.query(query_string3, (err4)=>{
                                if (err4){
                                    client.query('ROLLBACK');
                                    res.render('500.ejs');
                                    return;
                                }else{
                                    client.query("COMMIT", (err5)=>{
                                        if (err5){
                                            client.query('ROLLBACK');
                                            res.render('500.ejs');
                                        }else{
                                            client.end();
                                            //mudar para meus pedidos
                                            res.redirect('/');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            })
        }
    });
}

module.exports.listar_produtos = function (req, res){
    var query_string = `SELECT id_produto, nome, descricao, preco FROM tb_produto 
    WHERE id_servico = $1 AND disponivel = true`
    pool.query(query_string,[req.query.servico], (err, res_bd) => {
        if (err){
            res.render('500.ejs');
        }else{
            res.send(res_bd.rows);
        }
    });
}