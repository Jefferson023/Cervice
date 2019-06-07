const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const app = express();
const pool = require('../Config/db.js');
var tipo_servico =  [];
// tentativa de pegar os tipos de servicos


//configura bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function isAuthenticated(req, res, next) {
    if (req.user){
        return next();
    }  
    res.redirect('/login');
}

// GET meus-servicos.
router.get('/fornecedor/meus-servicos', function (req, res) {
    query_servico(res);
});

// GET novo-servico
router.get('/fornecedor/novo-servico', function (req, res) {
    query_tipo(res);
    
});
// Cadastrando o servico no BD FALTA VINCULAR AO USUARIO
router.post('/fornecedor/novo-servico',function(req, res){
   console.log(req.body);
   if(req.body.titulo.length == 0)
    {
        console.log('titulo não pode ser vazio');
        query_tipo(res);
        return;
    }
    else if(req.body.hora.length == 0)
    {
        console.log('hora não pode ser vazio');
        query_tipo(res);
        return;
    }
   pool.query('INSERT INTO tb_servico(nome,hora_abertura,abertura_status,id_tipo,banido) values ($1,$3,False,$2,False) RETURNING id_servico', [req.body.titulo,req.body.tipo,req.body.hora],
    (err, res_bd)=> {
    
    if (err) {
      console.log(err)
      query_tipo(res)
      return;
    }
    var id = res_bd.rows[0].id_servico;
    pool.query('INSERT INTO tb_fornecedor_servico(id_servico,id_usuario) values ($1,2) RETURNING id_servico', [id],
    (err, res_bd)=> 
    {
        if (err) {
            console.log(err,'dentro')
            query_tipo(res)
            return;
          }
        console.log(id)
        query_tipo(res)
    })
    
    
    
});
    
})
function query_tipo(res)
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
function query_servico(res)
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
function valor_tipo(valor)
{
   tipo_servico = valor 
}

module.exports = router;