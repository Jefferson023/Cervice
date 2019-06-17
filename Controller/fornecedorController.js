const pool = require('../Config/db.js');
const express = require('express');
const app = express();
module.exports.lista_servico_fornecedor = function (req,res)
{
  
  var id = req.user.id_usuario;
  var query_sf = 'SELECT * FROM tb_usuario as tu  inner join tb_fornecedor_servico as tfs on tu.id_usuario = tfs.id_usuario'
  var query_sf = query_sf +' inner join tb_servico as ts on tfs.id_servico = ts.id_servico WHERE tu.id_usuario = $1'
    pool.query(query_sf,[id],(err, res_bd) => {
        if (err) {
            console.log(err)
          } 
          res.render('fornecedor/meus-servicos.ejs',{servicos:res_bd.rows});
          
    });
}
module.exports.lista_pedidos_fornecedor = function (req,res)
{
  
  var id = req.user.id_usuario;
  var query_sf = "SELECT  coalesce(sum(tp.preco* tpp.qt_produto),0) as total,coalesce(l_produtos.produtos,'') as produtos, ts.id_servico,ts.nome as nome_servico,tu.id_usuario as  id_usuario_forn,tu.nome as nome_forn,tcu.numero_casa as numero_casa_forn,tcu.bloco_andar as bloco_andar_forn,tu.email as email_forn,tpe.*,tsp.id_status,tsp.nome as nome_status,tu_cliente.id_usuario as id_usuario_cliente,tu_cliente.nome as nome_cliente,tu_cliente.email as email_cliente,  "
  var query_sf = query_sf +' tcu_cliente.numero_casa as numero_casa_cliente,tcu_cliente.bloco_andar as bloco_andar_cliente FROM tb_usuario as tu inner join tb_fornecedor_servico as tfs on tu.id_usuario = tfs.id_usuario '
  var query_sf = query_sf + 'inner join tb_condominio_usuario as tcu on tcu.id_usuario = tu.id_usuario inner join tb_servico as ts on tfs.id_servico = ts.id_servico inner join tb_pedido as tpe on tpe.id_servico = ts.id_servico '
  var query_sf = query_sf + 'left join tb_produto_pedido as tpp on tpp.id_pedido = tpe.id_pedido left join tb_produto as tp on tpp.id_produto = tp.id_produto left join tb_status_pedido as tsp on tsp.id_status = tpe.id_status '
  var query_sf = query_sf + "left join (select tpe.id_pedido, string_agg(tpp.qt_produto|| ' x '||tp.nome, ', ') as produtos from tb_pedido as tpe  left join tb_produto_pedido as tpp on tpp.id_pedido = tpe.id_pedido left join tb_produto as tp on tpp.id_produto = tp.id_produto  group by 1) as l_produtos on tpe.id_pedido = l_produtos.id_pedido "

  var query_sf1 = query_sf + 'inner join tb_usuario as tu_cliente on tu_cliente.id_usuario = tpe.id_usuario inner join tb_condominio_usuario as tcu_cliente on tcu_cliente.id_usuario = tu_cliente.id_usuario WHERE tu.id_usuario = $1 and tsp.id_status = 5 group by 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21'
  var lista_pedidos = [];
  var lista_pedidos_finalizados = [];
  var status = [];
    pool.query(query_sf1,[id],(err, res_bd) => {
        if (err) {
            console.log(err)
          } 
          var query_sf2 = query_sf + 'inner join tb_usuario as tu_cliente on tu_cliente.id_usuario = tpe.id_usuario inner join tb_condominio_usuario as tcu_cliente on tcu_cliente.id_usuario = tu_cliente.id_usuario WHERE tu.id_usuario = $1 and tsp.id_status <> 5 group by 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21'
          lista_pedidos_finalizados = res_bd.rows;
          pool.query(query_sf2,[id],(err1, res_bd1)=>{
            if (err1) {
              console.log(err1)
            } 
            lista_pedidos = res_bd1.rows;
              pool.query('select * from tb_status_pedido',(err2, res_bd2)=>{
                if (err2) {
                  console.log(err2)
                }
                status = res_bd2.rows;
                res.render('fornecedor/minhas-entregas.ejs',{lista_pedidos_finalizados:lista_pedidos_finalizados,lista_pedidos:lista_pedidos,user:req.user,status:status});
              });
            
          });
          
          
    });
    
}
module.exports.lista_att_status  = function(req, res)
{

  values = [req.query.id_status,req.query.id_pedido];
  console.log(req.query)
  res.params = res.req.query.id_servico;
   pool.query('update tb_pedido set id_status= $1 where id_pedido = $2', values,(err1, res_bd) => {
    if (err1) {
        console.log(err1, 'err');
        return;
    }
   });
}
