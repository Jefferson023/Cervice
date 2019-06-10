const pool = require('../Config/db.js');
const express = require('express');
const app = express();
module.exports.lista_servico_fornecedor = function (req,res)
{
  if(!req.user)
    {
        console.log('nao logado');
        res.redirect('/login');
        return;
    }
  var id = req.user.id_usuario;
  var query_sf = 'SELECT * FROM tb_usuario as tu  inner join tb_fornecedor_servico as tfs on tu.id_usuario = tfs.id_usuario'
  var query_sf = query_sf +' inner join tb_servico as ts on tfs.id_servico = ts.id_servico WHERE tu.id_usuario = $1'
    pool.query(query_sf,[id],(err, res_bd) => {
        if (err) {
            console.log(err)
          } 
          else{
            valor_servico(res_bd.rows)
          }
          res.render('fornecedor/meus-servicos.ejs',{servicos:servicos});
    });
}
function valor_servico (valor)
{
    servicos = valor
}