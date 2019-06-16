$(function(){
    $("#btn-editar-dados").click(function(e){
        e.preventDefault();
        $("#nome").attr("readonly", false);
        $("#div-editar-senha").show();
        $("#btn-editar-dados").hide();
        $("#btn-salvar-dados").show();
    });
    
    $("#btn-salvar-dados").click(function(e){
        e.preventDefault();
        $("#nome").attr("readonly", true);
        $("#div-editar-senha").hide();
        $("#btn-editar-dados").show();
        $("#btn-salvar-dados").hide();
    });
});