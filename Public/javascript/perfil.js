$(function(){
    $("#btn-editar-dados").click(function(e){
        e.preventDefault();
        $("#nome").attr("readonly", false);
        $("#bloco").attr("readonly", false);
        $("#apartamento").attr("readonly", false);
        $("#div-editar-senha").show();
        $("#btn-editar-dados").hide();
        $("#btn-salvar-dados").show();
    });
});