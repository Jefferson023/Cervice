function add_produto(id_servico){
    $.ajax({
      url: "/fornecedor/clickservico/um-servico/add_produto",
      data: {id_servico: id_servico,nome:$("#txt-titulo-produto").val(),descricao:$("#txt-descricao-produto").val(),preco:parseFloat( $("#txt-preco-produto").val())}
    });
    location.reload();
}
function remover_produto(id_produto,id_servico){
      $.ajax({
        url: "/fornecedor/clickservico/um-servico/remover_produto",
        data: {id_servico: id_servico,id_produto:id_produto}
      });
      location.reload();
  }
  function alterar_produto(id_produto,id_servico,i){
      if(evento_edit == true)
      {
       $.ajax({
      url: "/fornecedor/clickservico/um-servico/editar_produto",
      data: {id_produto:id_produto,id_servico: id_servico,nome:$("#"+i+"_titulo").val(),descricao:$("#"+i+"_descricao").val(),preco:parseFloat( $("#"+i+"_preco").val())}
    });
     location.reload();
  }
  
}