const pool = require('../Config/db.js');
const client = require('../Config/clientdb.js');
const express = require('express');
const app = express();
var tipo_servico = [];
var lista_produtos = [];
var lista_tipo_servico = [];
module.exports.lista_tipo_servico = function(req, res) {

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
module.exports.lista_produtos = function(req, res) {
    var id_servico = res.req.query.id_servico;
    var nome = '';
    var descricao = '';
               
            pool.query('SELECT * FROM tb_servico as ts inner join tb_fornecedor_servico as tfs on tfs.id_servico = ts.id_servico where ts.id_servico = $1', [id_servico], (err1, res_bd1) => {
                usu = res_bd1.rows[0].id_usuario;
                if (err1) {
                    console.log('err1');
                    console.log(err1,'err1');
                    return;
                } 
                if(usu != req.user.id_usuario)
                {
                    res.redirect('/fornecedor/meus-servicos')
                }
                
                descricao = res_bd1.rows[0].descricao;
                nome = res_bd1.rows[0].nome;
                hora_abertura = res_bd1.rows[0].hora_abertura;
                hora_fechamento = res_bd1.rows[0].hora_fechamento;
                pool.query("SELECT *,CASE WHEN tp.disponivel =true then 1 else 2 end as on_off FROM tb_servico as ts inner join tb_produto as tp ON ts.id_servico = tp.id_servico where ts.id_servico = $1", [id_servico], (err2, res_bd2) => {

                    if (err2) {
                        console.log(err2,'err2');
                        return;
                    } 
                        
                        lista_produtos = res_bd2.rows;
                        pool.query('SELECT * FROM tb_tipo_servico', (err, res_bd) => {
                            if (err) {
                                console.log(err,'err');
                                return;
                            } 

                           tipo_servico = res_bd.rows;
                            res.render('fornecedor/um-servico.ejs', {
                                tipo_servico: tipo_servico,
                                lista_produtos:lista_produtos,
                                nome: nome,
                                descricao:descricao,
                                hora_abertura:hora_abertura,
                                hora_fechamento:hora_fechamento,
                                id_servico:id_servico
                            });
                    });
                               
                      
                    
                });
                
            });
        }

module.exports.editar_servico = function(req, res)
{

  values = [res.req.query.titulo,res.req.query.descricao,res.req.query.tipo,res.req.query.hora_abertura,res.req.query.hora_fechamento,res.req.query.id_servico];
    console.log(res.req.query.hora_fechamento)
  if(Date.parse('01/01/2011 '+res.req.query.hora_fechamento) < Date.parse('01/01/2011 '+res.req.query.hora_abertura))
    {
        console.log('hora de fechamento não pode ser antes que a hora de abertura');
        res.redirect('/fornecedor/clickservico/um-servico?id_servico='+res.req.query.id_servico);
        return;
    }
   pool.query('update tb_servico set nome= $1,descricao =$2,id_tipo =$3,hora_abertura = $4,hora_fechamento =$5 where id_servico =$6', values,(err1, res_bd) => {
    if (err1) {
        console.log(err1, 'err');
        return;
    }
   });
}
module.exports.editar_produto = function(req, res)
{

  values = [req.query.nome,req.query.descricao, req.query.preco,req.query.id_servico,req.query.id_produto];
   pool.query('update tb_produto set nome= $1,descricao =$2,preco =$3,id_servico =$4 where id_produto = $5', values,(err1, res_bd) => {
    if (err1) {
        console.log(err1, 'err');
        return;
    }
   });
}
module.exports.add_produto= function(req,res)
{
    values = [req.query.nome,req.query.descricao, req.query.preco,req.query.id_servico]
    pool.query('INSERT INTO tb_produto values(default,$1,$2,$3,true,$4)',values,(err1, res_bd) => {
        if (err1) {
            console.log(err1, 'err');
            return;
        }

    
    });
    res.redirect('back');

}

module.exports.remover_produto= function(req,res)
{
    
    pool.query('DELETE FROM tb_produto where id_produto = $1',[req.query.id_produto],(err1, res_bd) => {
        if (err1) {
            console.log(err1, 'err');
            return;
        }

    
    });
}
module.exports.remover_servico= function(req,res)
{
    
    pool.query('DELETE FROM tb_servico where id_servico = $1',[req.query.id_servico],(err1, res_bd) => {
        if (err1) {
            console.log(err1, 'err');
            return;
        }
        
    
    });
    res.redirect('/fornecedor/meus-servicos');
}




function valor_tipo(valor) {
    tipo_servico = valor
}
module.exports.cadastro_servico = function(req, res) {
    if (req.body.titulo.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('titulo não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    if (req.body.hora_abertura.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('hora não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    if (req.body.hora_fechamento.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('hora não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    if(Date.parse('01/01/2011 '+req.body.hora_fechamento) < Date.parse('01/01/2011 '+req.body.hora_abertura))
    {
        console.log('hora de fechamento não pode ser antes que a hora de abertura');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    var id_usuario = req.user.id_usuario;
    client.connect();
    client.query('BEGIN', (err) => {
        if (err) {
            console.log(err, 'err');
            return;
        } else {


            var values1 = [req.body.titulo, req.body.tipo, req.body.hora_abertura, req.body.descricaoServico,req.body.hora_fechamento];
            var query_s = 'INSERT INTO tb_servico(nome,hora_abertura,id_tipo,banido,descricao,hora_fechamento) values '
            query_s = query_s + '($1,$3,$2,False,$4,$5) RETURNING id_servico'
            client.query(query_s, values1, (err1, res_bd) => {
                if (err1) {
                    console.log(err1);
                    client.query('ROLLBACK');
                    return;
                } else {
                    var id = res_bd.rows[0].id_servico;

                    client.query('INSERT INTO tb_fornecedor_servico(id_servico,id_usuario) values ($1,$2)', [id, id_usuario], (err2, res_bd2) => {
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
                        };
                    });
                };
            });
        };
    });
    req.flash("success", "Servico" + req.body.titulo + "criado com sucesso");
    res.redirect('/fornecedor/novo-servico');
}