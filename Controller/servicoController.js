const pool = require('../Config/db.js');
const client = require('../Config/clientdb.js');
const express = require('express');
const app = express();
var tipo_servico = [];
module.exports.lista_tipo_servico = function(res) {
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
    if (req.body.titulo.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('titulo não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    } else if (req.body.hora.length == 0) // trocar por um aviso de problema igual ao da tela de cadastro
    {
        console.log('hora não pode ser vazio');
        res.redirect('/fornecedor/novo-servico');
        return;
    }
    console.log('0.9');
    client.connect();
    client.query('BEGIN', (err) => {
      console.log('1');
        if (err) {
            console.log(err,'err');
            return;
        }
        var values1 = [req.body.titulo, req.body.tipo, req.body.hora];
        client.query('INSERT INTO tb_servico(nome,hora_abertura,abertura_status,id_tipo,banido) values ($1,$3,False,$2,False) RETURNING id_servico', values1, (err1, res_bd) => 
        {
            console.log('2');
            if (err1) {
                console.log(err1);
                client.query('ROLLBACK');
                return;
            }
            var id = res_bd.rows[0].id_servico; 
            client.query('INSERT INTO tb_fornecedor_servico(id_servico,id_usuario) values ($1,2)',[id],(err2, res_bd2) => 
            {
                   if (err2) {
                        console.log(err2, 'dentro');
                        client.query('ROLLBACK');
                        return;
                    }
                    client.query('COMMIT');
                    client.end();
                });
        });
    });
    console.log('aq');
    req.flash("success", "Servico" + req.body.titulo + "criado com sucesso");
    res.redirect('/fornecedor/novo-servico');
}