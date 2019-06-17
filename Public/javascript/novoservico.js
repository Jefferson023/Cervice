var evento_ = false;
var evento_edit = false;
$(function(){
    let ultimoIndice = $("#tb-produtos tbody tr").length + 1;



    $("#btn-novo-produto").click(function(e){
        e.preventDefault();
        $("#txt-titulo-produto").val("");
        $("#txt-descricao-produto").val("");
        $("#txt-preco-produto").val("");
        $("#linha-novo-produto").show();

        

    })
    //clique do botão add
    $("#tb-produtos").show();
    $("#btn-add-produto").click(function(e){
        e.preventDefault();
        let titulo = $("#txt-titulo-produto").val();
        let descricao = $("#txt-descricao-produto").val();
        let preco = $("#txt-preco-produto").val();
        let disponivel = $("#switch-disponivel").prop("checked");


        
        ultimoIndice++;
        $("#carregados").show();

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
    $(".btn-drop-produto").click(function(){
        //verifica a quantidade de linhas
        let linhas = $("#tb-produtos tbody").length;
        $(this).parent().parent().remove();
        if (linhas == 0){
            $("#tb-produtos").hide();
        }       
    })
    $(".btn-edit-produto").click(function(e){
        if(evento_edit ==false)
        {
        e.preventDefault();
        let index = $(this).parent().parent().index() + 1;
        $("#tb-produtos tbody tr:nth-child(" + index + ") td input").attr("readonly", false)
        $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-drop-produto").hide();
        $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-atualizar-produto").show();
        
        evento_edit = true;
        console.log(evento_edit)
        }
        
    });
    $(".btn-atualizar-produto").click(function(e){
        
            e.preventDefault();
            let index = $(this).parent().parent().index() + 1;
            $("#tb-produtos tbody tr:nth-child(" + index + ") td input").attr("readonly", false);
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-edit-produto").show();
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-drop-produto").show();
            $("#tb-produtos tbody tr:nth-child(" + index + ") td .btn-atualizar-produto").hide();
          
       
        });
    //mostra as os componentes ocultos e desbloqueia a textarea
    $("#btn-edit-informacoes").click(function(e){
        if(evento_ == false)
        {
            e.preventDefault();
            $("#linha-forms").show();
            $('#descricao-servico2').prop('readonly', false);
            evento_ = true;
        }
    });

    
});

