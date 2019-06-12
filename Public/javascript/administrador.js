//função para procurar nas tabelas por usuário
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#ativos tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
      $("#bloqueados tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});

//função de bloquear e desbloquear usuário
function bloquear(botao){
    var linha_tabela = $(botao).parent().parent();
    linha_tabela.remove();
    $(botao).removeClass('btn btn-danger');
    $(botao).addClass('btn btn-success');
    $(botao).attr('title', "Desbloquear");
    $(botao).attr('onclick', "desbloquear(this)");
    var icone = $(botao).children();
    icone.removeClass('icon-ban');
    icone.addClass("icon-lock-open");
    $('#bloqueados').append(linha_tabela);
    $.ajax({
      url: "/administrador/usuarios/banir",
      data: {email: linha_tabela.children()[2].innerHTML}
    });
}
function desbloquear(botao){
    var linha_tabela = $(botao).parent().parent();
    linha_tabela.remove();
    $(botao).removeClass('btn btn-success');
    $(botao).addClass('btn btn-danger');
    $(botao).attr('title', "Bloquear");
    $(botao).attr('onclick', "bloquear(this)");
    var icone = $(botao).children();
    icone.removeClass("icon-lock-open");
    icone.addClass('icon-ban');
    $('#ativos').append(linha_tabela);
    $.ajax({
      url: "/administrador/usuarios/desbanir",
      data: {email: linha_tabela.children()[2].innerHTML}
    });
}