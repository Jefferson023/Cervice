function alterar_status_and(id_pedido,i){
 
       $.ajax({
      url: "/fornecedor/minhas-entregas/att_status",
      data: {id_status:$("#sel_and_"+i).val(),id_pedido:id_pedido}
    });
     location.reload();
  }
  function alterar_status_fin(id_pedido,i){
 
    $.ajax({
   url: "/fornecedor/minhas-entregas/att_status",
   data: {id_status:$("#sel_fin_"+i).val(),id_pedido:id_pedido}
 });
  location.reload();
}