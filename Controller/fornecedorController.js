const pool = require('../Config/db.js');
module.exports.lista_tipo_servico = function (res)
{
    pool.query('SELECT * FROM tb_usuario as tu  inner join tb_fornecedor_servico as tfs on tu.id_usuario = tfs.id_usuario inner join tb_servico as ts on tfs.id_servico = ts.id_servico',(err, res_bd) => {
        if (err) {
            console.log(err)
          } 
          else{
            valor_servico(res_bd.rows)
            console.log(servicos)
          }
          res.render('fornecedor/meus-servicos.ejs',{servicos:servicos});
    });
}
function valor_servico (valor)
{
    servicos = valor
}