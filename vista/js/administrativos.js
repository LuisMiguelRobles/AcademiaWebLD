let administrativos = [];
let urlAdministrativos = "controlador/fachada.php";

$(function () {

    obtenerAdministrativos();

    $("#agregarAdministrativos").click(function () {
        agregarAdministrativos();
        limpiarCamposAdministrativosAgregar();
        $('#modalAdministrativos').modal('toggle'); //Cierra el modal despues de agregar
        
    });

    $("#editarAdministrativos").click(function () {
        editarAdministrativos();
        $('#modalAdministrativosEditar').modal('toggle');
    });

    $("#btnBuscarAdminstrativos").click(function () {
        obtenerAdministrativoPorCedula();       
        $("#buscarAdministrativo").val("");

    });

    $("#btnAtrasAdmin").click(function () {
        obtenerAdministrativos();
        $("#btnAtrasAdmin").fadeOut();
    });
    
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
            administrativos = data;
            //console.log(data);
            renderizarAdministrativos(data);
        }


    }).always(function (data) {
        console.log(data);
    });

}

function renderizarAdministrativos(data) {

    let tablaAdministrativos = "";

    tablaAdministrativos = `<table class="table table-bordered ">
                <thead class="thead-dark">
                    <tr>
                        <th>Cedula</th>
                        <th>Email</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
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
                        <button class="btn btn-danger delete" id="delete" onclick="eliminarAdministrativos(${value.cedulaadministrativo})"  data-toggle="modal" data-target="#validarEliminarAdministrativo">Eliminar</button>
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

/**
 * elimina los datos
 */
function eliminarAdministrativos(cedulaadministrativo){

    $('#myIDAdministrativo').html(cedulaadministrativo);

}

let confirmarEliminarAdministrativo = () => {

    const idAEliminar = $('#myIDAdministrativo').text();

    $.ajax({
        "url": urlAdministrativos,
        "type": "POST",
        "data": {
            clase: 'administrativos',
            oper: 'delete',
            cedulaadministrativo: idAEliminar
        }
    }).done(function (data) {
        obtenerAdministrativos();
    }).fail(function (error) {
        alert("No hubo respuesta del Servidor");
    });

}

function limpiarCamposAdministrativosAgregar() {

    $('#cedulaadministrativo').val('');
    $('#emailadministrativo').val('');
    $('#date').val('');
    $('#password').val('');
}


/**
*edita los datos que ya han sido ingresados
 */
function modalEditarAdministrativos(id) {
    //alert(id);
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
 * Obtiene solo un estudiante y lo muestra en la tabla de estudiantes
 */

function obtenerAdministrativoPorCedula() {

    $.ajax({

        "url": urlAdministrativos,
        "type": "GET",
        "data": {
            clase: "administrativos",
            oper: "select1",
            cedulaadministrativo: $("#buscarAdministrativo").val()

        },
        "dataType": "JSON"
    }).done((data) => {
        console.log(data);
        if (data) {
            administrativos = data;
            renderizarAdministrativos(data);
            $("#btnAtrasAdmin").fadeIn();
        } else {
            alert("No se encontro ningun registro");
        }


    });
}

