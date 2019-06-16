var produtos;
$.ajax({
    url: "/catalogo-servicos/detalhes-servico/solicitar/produtos",
    data: {servico: $('input[name=id_servico]').val()},
    dataType:"json",
    success: function(data){
        produtos = data; 
    }
});
function adicionar_produto(){
    $("#tb-produtos").show();
    var nova_linha =`
    <tr>
    <td>
      <select type="text" class="form-control" onclick="escolher(this)">
      <option selected>Escolha...</option>
    `
    produtos.forEach(produto =>{
        if ($('[name='+produto.id_produto+']').length == 0){
            nova_linha = nova_linha+ "<option>"+produto.nome+"</option>";
        }
    });
    nova_linha = nova_linha+`
      </select>
    </td>
    <td></td>
    <td><input type = "number" type="number" class="form-control" oninput = "atualiza_valor(this)"></td>
    <td name = "preco">
    </td>
    <td>
        <button type = "button" class="btn btn-danger btn-drop-produto" onclick="deletar(this)" title = "remover">
            <i class="fa fa-trash"></i>
        </button>
    </td>
  </tr>`
  $('#linhas').append(nova_linha);
  if ($('#linhas').children().length > 1){
    atualiza_total();
  } 
}
function escolher(escolha){
    if ($(escolha).val() != 'Escolha...'){
        var linha = $(escolha).parent().parent();
        produtos.forEach(produto =>{
            if (produto.nome == $(escolha).val()){
                $($(linha).children()[1]).text(produto.descricao);
                $($(linha).children()[3]).text(produto.preco+'R$');
                $($(linha).children()[2]).children().val(1);
                $($(linha).children()[2]).children().attr('name', produto.id_produto);
            }
        });
        atualiza_total();
    }
}
function atualiza_valor(quantidade){
    var linha = $(quantidade).parent().parent();
    if ($(quantidade).val() == ""){
        $($(linha).children()[3]).text("0R$");
        return;
    }else{
        produtos.forEach(produto =>{
            if (produto.nome == $(linha).find('select').val()){
                $($(linha).children()[3]).text((produto.preco*$(quantidade).val())+'R$');
                atualiza_total();
            }
        });
    }
}
function deletar(botao){
    $(botao).parent().parent().remove();
    atualiza_total();
}
function atualiza_total(){
    $("#total").remove();
    var linhas = $('#linhas').children();
    if (linhas.length < 1){
        return;
    }
    var soma = 0;
    for (var i = 0; i < linhas.length; i++){
        var valor_atual = $($(linhas[i]).children()[3]).text().replace("R$", "");
        soma = soma + parseFloat(valor_atual)
    }
    var total = `
    <tr id = "total">
        <td></td>
        <td></td>
        <td><b>TOTAL:</b></td>
        <td><b>`+soma+`R$</b><td></tr>`
    $('#linhas').append(total);    
}
function submit_form(){
    if ($('#linhas').children().length < 1){
        return;
    }
    $('#solicitacao_form').submit();
}