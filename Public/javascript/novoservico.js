$(function(){
    $("#btn-novo-produto").click(function(e){
        e.preventDefault();
        $("#linha-novo-produto").show();
        $("#tb-produtos").show();
    })
    //clique do botão add
    $("#btn-add-produto").click(function(e){
        e.preventDefault();
        let titulo = $("#txt-titulo-produto").val();
        let descricao = $("#txt-descricao-produto").val();
        let preco = $("#txt-preco-produto").val();

        $("#tb-produtos tbody").prepend(
            "<tr>"+
            "<td> <input type='text' readonly class='form-control-plaintext' name='produtos[1].titulo' value='" + titulo + "'></td>"+
            "<td> <input type='text' readonly class='form-control-plaintext' name='produtos[1].descricao' value='" + descricao + "'></td>"+
            "<td> <input type='text' readonly class='form-control-plaintext' name='produtos[1].preco' value='" + preco + "'></td>"+
            "<td> <button class='btn btn-danger btn-drop-produto'><i class='fa fa-trash'></i></button></td>"+
            "</tr>"
        );
        $("#linha-novo-produto").hide();
    })
    $(".btn-drop-produto").click(function(){
        //verifica a quantidade de linhas
        let linhas = $("#tb-produtos tbody").length;
        $(this).parent().parent().remove();
        if (linhas == 0){
            $("#tb-produtos").hide();
        }       
    })
});

