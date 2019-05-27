const express = require('express');
const router = express.Router();
const repositorioUsuario = require('./../Data/repositorio-usuario');

// GET login.
router.get('/login', function (req, res) {
    let data = {};
    if(req.query.acao && req.query.acao == 'novo')
        data = { mensagem : 'Cadastro efetuado com sucesso. Faça login para acessar o sistema.' };
    res.render('login.ejs', data);
});

// POST login.
router.post('/login', function (req, res) {
    repositorioUsuario.validarCredenciais(req.body)
                      .then(sucesso => {
                          if(sucesso) {
                            res.render('login.ejs', { mensagem : 'Acesso autorizado.'});
                          }
                          else {
                            res.render('login.ejs', { erro : 'Email ou senha incorretos.'});
                          }
                      })
                      .catch(erro => res.render('login.ejs', { mensagem : erro }));
});

// GET cadastro.
router.get('/cadastro', function (req, res) {
    //pega o código do condominio e substituti
    codigo = req.query['codigo']
    res.render('cadastro.ejs', { codigo_condominio: codigo });
});

// POST cadastro.
router.post('/cadastro', function (req, res) {
    repositorioUsuario.cadastrarUsuario(req.body)
                      .then(sucesso => {
                        if(sucesso) {
                            res.redirect('login?acao=novo');
                        }
                        else {
                            res.render('cadastro.ejs', { erro : 'Erro ao cadastrar usuário.'});
                        }
                      })
                      .catch(erro => res.render('cadastro.ejs', { erro : 'Erro ao cadastrar usuário.' }));
});

module.exports = router;