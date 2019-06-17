function remover_servico(id_servico){
    $.ajax({
      url: "/fornecedor/meus-servicos/remover-servico",
      data: {id_servico: id_servico}
    });
}