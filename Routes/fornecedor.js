const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const passport = require('passport');
const app = express();
const pool = require('../Config/db.js');
var tipo_servico =  [];
// tentativa de pegar os tipos de servicos
pool.query('SELECT nome FROM tb_tipo_servico',(err, res_bd) => {
    if (err) {
        console.log(err)
      } 
      else{
        for(var i = 0; i<res_bd.length; i++ )
        {     
            tipo_servico.push(res[i]);
        }   
      }
});

console.log(tipo_servico,'porra arnaldo');
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
    res.render('fornecedor/meus-servicos.ejs');
});

// GET novo-servico
router.get('/fornecedor/novo-servico', function (req, res) {
    res.render('fornecedor/novo-servico.ejs');
});
// Cadastrando o servico no BD FALTA VINCULAR AO USUARIO
router.post('/fornecedor/novo-servico',function(req, res){
   pool.query('INSERT INTO tb_servico(nome,hora_abertura,abertura_status,id_tipo,banido) values ($1,current_timestamp,False,1,False)', [req.body.titulo], (err, res_bd)=> {
    if (err) {
      console.log(err)
    } 
    res.render('fornecedor/novo-servico.ejs');
});
    
})

module.exports = router;