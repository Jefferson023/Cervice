var status_nome, status_email, status_senha, status_confirmSenha, status_codCondominio = false; 

function validar_nome(){
  var nome = $("#nome").val();
  $('#nome').popover('dispose');
  if (nome.length == 0){
    status_nome = false;
    $('#nome').popover({
      content: "O seu nome não pode ficar em branco",
      trigger: 'manual'
    });
    $('#nome').popover('show');
  }else{
    if (/(\d)/.test(nome)){
      status_nome = false;
      $('#nome').popover({
        content: "O seu nome não pode conter números",
        trigger: 'manual'
      });
      $('#nome').popover('show');

    }else{
      status_nome = true;
    }
  }
};
function validar_email(){
  var email = $('#email').val();
  $('#email').popover('dispose');

  if (email.length == 0){
    status_email = false
    $('#email').popover({
      content: "O seu e-mail não pode ficar em branco",
      trigger: 'manual'
    });
    $('#email').popover('show');
  }else{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)){
      status_email = false;
      $('#email').popover({
        content: "Você deve inserir um e-mail válido",
        trigger: 'manual'
      });
      $('#email').popover('show');
    }
    //verificar se existe na base de dados
  };
}
function validar_senha(){
  var senha = $('#senha').val();
  $('#senha').popover('dispose');

  if (senha.length == 0){
    status_senha = false;
    $('#senha').popover({
      content: "A sua senha não pode ficar em branco",
      trigger: 'manual'
    });
    $('#senha').popover('show');
  }else{
    status_senha = false;
    if (/(\W)/.test(senha)){
      $('#senha').popover({
        content: "A sua senha deve conter apenas letras, números ou underscore",
        trigger: 'manual'
      });
      $('#senha').popover('show');
    }else{
      status_senha = true;
    }
  }
};
function validar_confirmSenha(){
  var confirm_senha = $('#confirm_senha').val();
  var senha = $('#senha').val();
  $('#confirm_senha').popover('dispose');
  if (confirm_senha.length == 0){
    status_confirmSenha = false;
    $('#confirm_senha').popover({
      content: "A confirmação de senha não pode ficar em branco",
      trigger: 'manual'
    });
    $('#confirm_senha').popover('show');
  }
  else{
    if (senha != confirm_senha){
      status_confirmSenha = false;
      $('#confirm_senha').popover({
        content: "Sua senha não confere",
        trigger: 'manual'
      });
      $('#confirm_senha').popover('show');
    }else{
      status_confirmSenha = true;
    }
  }    
};
/**
function validar_condominio(){
  var cod_condominio = $("#codigo").val()
  if (cod_condominio.length == 0){
    status_codCondominio = false;
    $('#codigo').popover({
      content: "O código do condomínio não pode ficar em branco",
      trigger: 'manual'
    });
    $('#codigo').popover('show');
  }else{
    //verificação com ajax
    $.ajax({
      url: "/cadastro/condominio_disponivel?cod_condominio="+cod_condominio,
      type: "GET",
      dataType: "text",
      success: (data) =>
      {
          if (data != "true"){
            status_codCondominio = false;
            $('#codigo').popover({
              content: "O código do condomínio digitado não existe",
              trigger: 'manual'
            });
            $('#codigo').popover('show');
          }else{
            status_codCondominio = true;
          }
      }
  }) 
  }
};*/