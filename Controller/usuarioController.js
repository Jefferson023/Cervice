const pool = require('../Config/db.js');
const client = require('../Config/clientdb.js');
const crypt = require('../Config/crypt.js');

module.exports.novo_usuario = function (req, res) {
    values = [crypt.criptografar(req.body.senha), req.body.email, req.body.nome]
    
    client.query('BEGIN', (err) => {
        if (err) {
            //só saia
        }
        else {
            client.query("INSERT INTO tb_usuario VALUES (DEFAULT, $1, $2, $3, false) RETURNING id_usuario", values, (err2, res_bd) => {
                if (err2) {
                    client.query('ROLLBACK');
                } else {
                    client.query("SELECT * FROM tb_condominio WHERE codigo_acesso=$1", [req.body.codigo], (err3, res_bd2) => {
                        if (err3) {
                            client.query('ROLLBACK');
                        } else {
                            values = [res_bd.rows[0].id_usuario, res_bd2.rows[0].id_condominio, req.body.numero, req.body.bloco]
                            client.query("INSERT INTO tb_condominio_usuario VALUES ($1, $2, $3, $4)", values, (err4) => {
                                if (err4) {
                                    client.query('ROLLBACK');
                                } else {
                                    client.query('COMMIT', (err) => {
                                        if (err) {
                                            client.query('ROLLBACK');
                                        } else {
                                            
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    });
    req.flash("success", "Sua conta foi criada. Entre utilizando seu email e senha nos campos abaixo");
    res.redirect('/login');
}
module.exports.usuarios_condominio = function (req, res) {
    query_string = 'SELECT U.nome, U.email, U.banido, C.nome AS condominio, UC.numero_casa, UC.bloco_andar FROM'
    query_string = query_string + ' tb_usuario U JOIN tb_condominio_usuario UC ON U.id_usuario = UC.id_usuario JOIN';
    query_string = query_string + ' tb_condominio C ON UC.id_condominio = C.id_condominio WHERE C.id_condominio IN';
    query_string = query_string + ' (SELECT AC.id_condominio FROM tb_usuario U2 JOIN tb_administrador_condominio AC ON';
    query_string = query_string + ' U2.id_usuario=AC.id_usuario WHERE U2.id_usuario=$1)';
    pool.query(query_string, [req.user.id_usuario], (err, res_bd) => {
        if (err) {
            //internal server error page
            console.log(err);
        }
        ativos = [];
        banidos = [];
        for (var i = 0; i < res_bd.rows.length; i++) {
            if (res_bd.rows[i].banido == false) {
                ativos.push(res_bd.rows[i])
            } else {
                banidos.push(res_bd.rows[i])
            }
        }
        res.render('administrador/usuarios.ejs', { usuarios_ativos: ativos, usuarios_banidos: banidos });
    });
}

module.exports.verifica_disponibilidade_email = function (req, res) {
    pool.query("SELECT * FROM tb_usuario WHERE email=$1", [req.query.email], (err, res_bd) => {
        if (err) {
            //internal server error page
        }
        if (res_bd.rows.length >= 1) {
            res.send("false");
        } else {
            res.send("true");
        }
    });
}

module.exports.banir = function (req, res) {
    query_string = "SELECT * FROM (tb_usuario U JOIN tb_administrador_condominio A ON U.id_usuario = A.id_usuario)"
    query_string = query_string + " WHERE U.id_usuario=$1 AND A.id_condominio IN (SELECT id_condominio FROM"
    query_string = query_string + " (tb_usuario U2 JOIN tb_condominio_usuario UC ON U2.id_usuario=UC.id_usuario)"
    query_string = query_string + " WHERE U2.email=$2)"
    pool.query(query_string, [req.user.id_usuario, req.query.email], (err, res_bd) => {
        if (err) {
            return;
        } else {
            if (res_bd.rows.length == 0) {
                return;
            } else {
                pool.query("UPDATE tb_usuario SET banido=true WHERE email=$1", [req.query.email], (err) => {
                });
            }
        }
    });
    res.redirect('/administrador/usuarios');
}

module.exports.desbanir = function (req, res) {
    query_string = "SELECT * FROM (tb_usuario U JOIN tb_administrador_condominio A ON U.id_usuario = A.id_usuario)"
    query_string = query_string + " WHERE U.id_usuario=$1 AND A.id_condominio IN (SELECT id_condominio FROM"
    query_string = query_string + " (tb_usuario U2 JOIN tb_condominio_usuario UC ON U2.id_usuario=UC.id_usuario)"
    query_string = query_string + " WHERE U2.email=$2)"
    pool.query(query_string, [req.user.id_usuario, req.query.email], (err, res_bd) => {
        if (err) {
            return;
        } else {
            if (res_bd.rows.length == 0) {
                return;
            } else {
                pool.query("UPDATE tb_usuario SET banido=false WHERE email=$1", [req.query.email], (err) => {
                });
            }
        }
    });
}
//informações do usuário AINDA EM TESTE
exports.infoperfil = function (req, res) {
    query_str = "SELECT cdu.numero_casa, cdu.bloco_andar, cd.nome as nome_condominio, cd.logradouro,cd.numero, cd.cidade, cd.estado, cd.codigo_acesso ";
    query_str = query_str + "from tb_usuario u ";
    query_str = query_str + "join tb_condominio_usuario cdu on cdu.id_usuario = u.id_usuario ";
    query_str = query_str + "join tb_condominio cd on cdu.id_condominio = cd.id_condominio ";
    query_str = query_str + "where u.id_usuario = $1";
    let id_usuario = req.user.id_usuario;
    pool.query(query_str, [id_usuario], (err, res_bd) => {
        if (err) {
            console.log(err);
            return;
        } else {
            let dados = res_bd.rows[0];
            res.render('globais/perfil.ejs', { dados: dados });
        }
    });

}
module.exports.lista_pedidos = function (req, res) {
    var query_sf = "SELECT  coalesce(sum(tp.preco* tpp.qt_produto),0) as total,coalesce(l_produtos.produtos,'') as produtos, ts.id_servico,ts.nome as nome_servico,tu.id_usuario as  id_usuario_forn,tu.nome as nome_forn,tcu.numero_casa as numero_casa_forn,tcu.bloco_andar as bloco_andar_forn,tu.email as email_forn,tpe.*,tsp.id_status,tsp.nome as nome_status,tu_cliente.id_usuario as id_usuario_cliente,tu_cliente.nome as nome_cliente,tu_cliente.email as email_cliente,  "
    var query_sf = query_sf +' tcu_cliente.numero_casa as numero_casa_cliente,tcu_cliente.bloco_andar as bloco_andar_cliente FROM tb_usuario as tu inner join tb_fornecedor_servico as tfs on tu.id_usuario = tfs.id_usuario '
    var query_sf = query_sf + 'inner join tb_condominio_usuario as tcu on tcu.id_usuario = tu.id_usuario inner join tb_servico as ts on tfs.id_servico = ts.id_servico inner join tb_pedido as tpe on tpe.id_servico = ts.id_servico '
    var query_sf = query_sf + 'left join tb_produto_pedido as tpp on tpp.id_pedido = tpe.id_pedido left join tb_produto as tp on tpp.id_produto = tp.id_produto left join tb_status_pedido as tsp on tsp.id_status = tpe.id_status '
    var query_sf = query_sf + "left join (select tpe.id_pedido, string_agg(tpp.qt_produto|| ' x '||tp.nome, ', ') as produtos from tb_pedido as tpe  left join tb_produto_pedido as tpp on tpp.id_pedido = tpe.id_pedido left join tb_produto as tp on tpp.id_produto = tp.id_produto  group by 1) as l_produtos on tpe.id_pedido = l_produtos.id_pedido "
  
    var query_sf1 = query_sf + 'inner join tb_usuario as tu_cliente on tu_cliente.id_usuario = tpe.id_usuario inner join tb_condominio_usuario as tcu_cliente on tcu_cliente.id_usuario = tu_cliente.id_usuario WHERE tu_cliente.id_usuario = $1 and tsp.id_status = 5 or tsp.id_status = 6 group by 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21'
    pool.query(query_sf1,[req.user.id_usuario],(err, res_bd) =>{
        if (err) {
            console.log(err)
            return;
          } 
          var query_sf2 = query_sf + 'inner join tb_usuario as tu_cliente on tu_cliente.id_usuario = tpe.id_usuario inner join tb_condominio_usuario as tcu_cliente on tcu_cliente.id_usuario = tu_cliente.id_usuario WHERE tu_cliente.id_usuario = $1 and tsp.id_status <> 5 and tsp.id_status <> 6 group by 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21'
          lista_pedidos_finalizados = res_bd.rows;
          pool.query(query_sf2,[req.user.id_usuario],(err1, res_bd1)=>{ 
            if (err1) {
                console.log(err1)
                return;
              } 
              lista_pedidos = res_bd1.rows;
                pool.query('select * from tb_status_pedido',(err2, res_bd2)=>{
                  if (err2) {
                    console.log(err2)
                  }
                  status = res_bd2.rows;
                  res.render('globais/meus-pedidos.ejs',{lista_pedidos_finalizados:lista_pedidos_finalizados,lista_pedidos:lista_pedidos,user:req.user,status:status});
                });   
    

    });
});
}
module.exports.atualizar_perfil = function (req, res) {
    let dadosPerfil = [req.body.nome, req.user.id_usuario];

    
    let updateSenha = "";
    if (req.body.senha && req.body.confirmasenha) {
        updateSenha = ", senha = $3 ";
        dadosPerfil.push(crypt.criptografar(req.body.senha));
    }

    client.query('BEGIN', (err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Erro ao atualizar os dados do perfil.");
        }
        else {
            client.query("UPDATE tb_usuario SET nome = $1 " + updateSenha + " WHERE id_usuario= $2", dadosPerfil, (err2, res_bd) => {
                if (err2) {
                    console.log(err2);
                    client.query('ROLLBACK');
                    req.flash("error", "Erro ao atualizar os dados do perfil.");
                } else {
                    client.query("UPDATE tb_condominio_usuario SET numero_casa=$1,bloco_andar=$2 WHERE id_usuario=$3", [req.body.apartamento, req.body.bloco, req.user.id_usuario], (err3, res_bd2) => {
                        if (err3) {
                            console.log(err3);
                            client.query('ROLLBACK');
                            req.flash("error", "Erro ao atualizar os dados do perfil.");
                        } else {
                            client.query('COMMIT', (err) => {
                                req.flash("success", "Dados atualizados com sucesso.");
                                
                            });
                        }
                    });
                }
            });
        };
    });
    this.infoperfil(req,res);
}