let administrativos = [];
let urlAdministrativos = "controlador/fachada.php";

$(function () {

    obtenerAdministrativos();

    $("#enviarAdministrativo").click(function () {
        agregarAdministrativos();
    })

    $("#editarAdministrativos").click(function() { 
        editarAdministrativos();
    })


  

});

function obtenerAdministrativos() {

    $.ajax({
        "url": urlAdministrativos,
        "type": "GET",
        "data": {
            clase: "administrativos",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {

        if (data) {
            administrativos =data;
            //console.log(data);
            renderizarAdministrativos(data);
        }


    }).always(function (data) {
        //console.log(data);
    });

}

function renderizarAdministrativos(data) {

    let tablaAdministrativos = "";

    tablaAdministrativos = `<table class="table table-bordered ">
                <thead class="thead-dark">
                    <tr>
                        <td>Cedula</td>
                        <td>Email</td>
                        <td>Fecha</td>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        tablaAdministrativos +=
            `<tr>
                <td>${value.cedulaadministrativo}</td>
                <td>${value.emailadministrativo}</td>
                <td>${value.date}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-info" data-toggle="modal" data-target="#modalAdministrativosEditar" onclick="modalEditarAdministrativos(${value.cedulaadministrativo})">Editar</button>
                        <button class="btn btn-danger delete" id="delete" onclick="eliminarAdministrativos(${value.cedulaadministrativo})">Eliminar</button>
                    </div>     
                </td>
            </tr>`;
    });
    tablaAdministrativos += `</table>`;
    $("#contenedorAdmin").html(tablaAdministrativos);

}


function agregarAdministrativos() {

    $.ajax({
        "url": urlAdministrativos,
        "type": "POST",
        "data": {
            clase: "administrativos",
            oper: "add",
            cedulaadministrativo: $("#cedulaadministrativo").val(),
            emailadministrativo: $("#emailadministrativo").val(),
            date: $("#date").val(),
            password: $("#password").val(),
        },
        "dataType": "JSON"

    }).done(function (data) {
        console.log(data);
        obtenerAdministrativos();
    }).always((data) => {
        console.log(data);
    });


}

function editarAdministrativos() {

    $.ajax({
        "url": urlAdministrativos,
        "type": "POST",
        "data": {
            clase: "administrativos",
            oper: "edit",
            cedulaadministrativo: $("#cedulaadministrativoEditar").val(),
            emailadministrativo: $("#emailadministrativoEditar").val(),
            date: $("#dateEditar").val(),
            password: $("#passwordEditar").val(),
        },
        "dataType": "JSON"

    }).done(function (data) {
        console.log(data);
        obtenerAdministrativos();
    }).always((data) => {
        console.log(data);
    });


}
/**
 * elimina los datos
 */
function eliminarAdministrativos(cedulaadministrativo){

    $.ajax({
        "url": urlAdministrativos,
        "type": "POST",
        "data":{
            clase:"administrativos",
            oper:"delete",
            cedulaadministrativo:cedulaadministrativo
        }

    }).done((data)=>{

        obtenerAdministrativos();

    });

}
/**
*edita los datos que ya han sido ingresados
 */
function modalEditarAdministrativos(id) {
    alert(id);
    for (let value of administrativos) {
        if (value.cedulaadministrativo == id) {
            $("#Id").val(value.cedulaadministrativo);
            $("#cedulaadministrativoEditar").val(value.cedulaadministrativo);
            $("#emailadministrativoEditar").val(value.emailadministrativo);
            $("#dateEditar").val(value.date);
            $("#passwordEditar").val(value.password);
        }
    }
}



