function mudar_categoria(el){
    $("#categoria").text($(el).text());
}
function buscar(){
    $("#catalogo").empty();
    $.ajax({
        url: "/catalogo-servicos/servicos",
        data: {nome_servico: $("#nome_servico").val(), categoria: $("#categoria").text().replace("Categoria", "")},
        dataType:"json",
        success: function(data){
            data.forEach(function (element) {
                descricao = element.descricao == null ? "Sem descrição":element.descricao
                servico = `
                <div class="col-sm-6 col-lg-3">
                    <a href="/catalogo-servicos/detalhes-servico?id_servico=` + element.id_servico+`">
                        <div class="card mb-3">
                            <img src="`+element.link+`" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+element.categoria+`</h5>
                                <h6 class="card-subtitle">`+element.nome+`</h6>
                                <p class="card-text">`+descricao+`</p>
                            </div>
                        </div>
                    </a>
                </div>`;
                $("#catalogo").append(servico);
            });
        }
    });
}
$(document).ready(buscar());