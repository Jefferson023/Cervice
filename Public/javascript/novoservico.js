$(function(){
    let ultimoIndice = $("#tb-produtos tbody tr").length + 1;

    $("#btn-novo-produto").click(function(e){
        e.preventDefault();
        $("#txt-titulo-produto").val("");
        $("#txt-descricao-produto").val("");
        $("#txt-preco-produto").val("");
        $("#linha-novo-produto").show();
        $("#tb-produtos").show();
        $("#txt-titulo-produto").focus();
    })
    //clique do botão add
    $("#btn-add-produto").click(function(e){
        e.preventDefault();
        let titulo = $("#txt-titulo-produto").val();
        let descricao = $("#txt-descricao-produto").val();
        let preco = $("#txt-preco-produto").val();
        let disponivel = $("#switch-disponivel").prop("checked");

        $("#tb-produtos tbody").prepend(
            "<tr>"+
            "<td> <input type='text' readonly class='form-control-plaintext' name='produtos[" + ultimoIndice + "].titulo' value='" + titulo + "'></td>"+
            "<td> <input type='text' readonly class='form-control-plaintext' name='produtos[" + ultimoIndice + "].descricao' value='" + descricao + "'></td>"+
            "<td> <input type='number' readonly class='form-control-plaintext' name='produtos[" + ultimoIndice + "].preco' value='" + preco + "'></td>"+
            "<td> <div class='custom-control custom-switch'><input type='checkbox' name='produtos[" + ultimoIndice + "].disponivel' " + ( disponivel ? "checked" : "") + " class='custom-control-input' id='switchDisponivel" + ultimoIndice + "'><label class='custom-control-label' for='switchDisponivel" + ultimoIndice + "'></div></td>"+
            "<td> " +
            "   <button class='btn btn-primary btn-edit-produto'><i class='fa fa-edit'></i></button>"+
            "   <button class='btn btn-danger btn-drop-produto'><i class='fa fa-trash'></i></button>"+
            "   <button class='btn btn-success btn-atualizar-produto' style='display:none'><i class='fa fa-check'></i></button>"+
            "</td>"+
            "</tr>"
        );

        ultimoIndice++;

        $("#linha-novo-produto").hide();

        $(".btn-drop-produto").click(function(){
            //verifica a quantidade de linhas
            let linhas = $("#tb-produtos tbody").length;
            $(this).parent().parent().remove();
            if (linhas == 0){
                $("#tb-produtos").hide();
            }       
        });
    
        $(".btn-edit-produto").click(function(e){
            e.preventDefault();
    
            let index = $(this).parent().parent().index() + 1;
            $("#tb-produtos tbody tr:nth-child(" + index + ") td input").attr("readonly", false)
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-edit-produto").hide();
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-drop-produto").hide();
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-atualizar-produto").show();
        });
        
        $(".btn-atualizar-produto").click(function(e){
            e.preventDefault();
    
            let index = $(this).parent().parent().index() + 1;
            $("#tb-produtos tbody tr:nth-child(" + index + ") td input").attr("readonly", true);
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-edit-produto").show();
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-drop-produto").show();
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-atualizar-produto").hide();
        });
    })



    //mostra as os componentes ocultos e desbloqueia a textarea
    $("#btn-edit-informacoes").click(function(e){
        e.preventDefault();
        $("#linha-forms").show();
        $('#descricao-servico2').prop('readonly', false);
    })
    //ativar/desativa botoes
    $("#btn-desabilitar-servico").click(function(e){
        e.preventDefault();
        $("#btn-habilitar-servico").show();      
        $("#btn-desabilitar-servico").hide();  
    });

    $("#btn-habilitar-servico").click(function(e){
        e.preventDefault();
        $("#btn-habilitar-servico").hide();      
        $("#btn-desabilitar-servico").show();      
    })
    
    $("#btn-cancelar-add").click(function(e){
        e.preventDefault();
        $("#txt-titulo-produto").val("");
        $("#txt-descricao-produto").val("");
        $("#txt-preco-produto").val("");
        $("#linha-novo-produto").hide();
    });
});