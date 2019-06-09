const pool = require('../Config/db.js');

module.exports.lista_tipo_servico = function (res)
{
    pool.query('SELECT * FROM tb_tipo_servico',(err, res_bd) => {
        if (err) {
            console.log(err)
          } 
          else{
            valor_tipo(res_bd.rows)
            console.log(tipo_servico)
          }
          res.render('fornecedor/novo-servico.ejs',{tipo_servico:tipo_servico});
    });
}

function valor_tipo(valor)
{
   tipo_servico = valor 
}
module.exports.cadastro_servico = function(req,res){
    console.log(req.body);
    if(req.body.titulo.length == 0)
     {
         console.log('titulo não pode ser vazio');
         res.redirect('/fornecedor/novo-servico')
         return;
     }
     else if(req.body.hora.length == 0)
     {
         console.log('hora não pode ser vazio');
         res.redirect('/fornecedor/novo-servico')
         return;
     }
    pool.query('INSERT INTO tb_servico(nome,hora_abertura,abertura_status,id_tipo,banido) values ($1,$3,False,$2,False) RETURNING id_servico', [req.body.titulo,req.body.tipo,req.body.hora],
     (err, res_bd)=> {
     
     if (err) {
       console.log(err)
       res.redirect('/fornecedor/novo-servico')
       return;
     }
     var id = res_bd.rows[0].id_servico;
     pool.query('INSERT INTO tb_fornecedor_servico(id_servico,id_usuario) values ($1,2) RETURNING id_servico', [id],
     (err, res_bd)=> 
     {
         if (err) {
             console.log(err,'dentro')
             res.redirect('/fornecedor/novo-servico')
             return;
           }
         console.log(id)
         res.redirect('/fornecedor/novo-servico')
     })
     
     
     
 });
   
}