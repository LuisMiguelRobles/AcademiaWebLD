let estudiantes = [];
let url = "controlador/fachada.php";

$(function () {

    obtenerEstudiantes();

    $("#agregarEstudiante").click(function () {
        agregarEstudiante();
    })



});

function obtenerEstudiantes() {

    $.ajax({
        "url": url,
        "type": "GET",
        "data": {
            clase: "Estudiante",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {

        if (data) {
            //console.log(data);
            renderizar(data);
        }


    }).always(function (data) {
        //console.log(data);
    });

}

function renderizar(data) {

    let tablaEstudiantes = "";

    tablaEstudiantes = `<table class="table table-bordered ">
                <thead class="thead-dark">
                    <tr>
                        <td>Documento</td>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Fecha de Nacimiento</td>
                        <td>Dirección</td>
                        <td>Telefono</td>
                        <td>Correo</td>
                        <td>Opciones</td>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        tablaEstudiantes +=
            `<tr>
                <td>${value.documentoestudiante}</td>
                <td>${value.nombreestudiante}</td>
                <td>${value.apellidoestudiante}</td>
                <td>${value.fechanacimiento}</td>
                <td>${value.direccion}</td>
                <td>${value.telefono}</td>
                <td>${value.correo}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-info" data-toggle="modal" data-target="#modalEditar" onclick="modalEditarEstudiante(${value.id})">Editar</button>
                        <button class="btn btn-danger delete" id="delete" onclick="eliminarEstudiante(${value.documentoestudiante})">Eliminar</button>
                    </div>     
                </td>
            </tr>`;
    });
    tablaEstudiantes += `</table>`;
    $("#renderizarEstudiante").html(tablaEstudiantes);

}


function agregarEstudiante() {

    $.ajax({
        "url": url,
        "type": "POST",
        "data": {
            clase: "Estudiante",
            oper: "add",
            documentoestudiante: $("#documentoEstudiante").val(),
            nombreEstudiante: $("#nombreEstudiante").val(),
            apellidoEstudiante: $("#apellidoEstudiante").val(),
            fechaNacimiento: $("#fechaNacimiento").val(),
            direccion: $("#direccion").val(),
            telefono: $("#telefono").val(),
            correo: $("#correo").val()
        },
        "dataType": "JSON"

    }).done(function (data) {
        console.log(data);
        obtenerEstudiantes();
    }).always((data) => {
        console.log(data);
    });


}

function eliminarEstudiante(documentoestudiante){

    $.ajax({
        "url": url,
        "type": "POST",
        "data":{
            clase:"Estudiante",
            oper:"delete",
            documentoestudiante:documentoestudiante
        }

    }).done((data)=>{

        obtenerEstudiantes();

    });

}


function modalEditarEstudiante(id) {


    for (let value of users) {
        if (value.id == id) {
            $("#Id").val(value.id);
            $("#nombreEditar").val(value.nombre);
            $("#apellidoEditar").val(value.apellido);
            $("#cedulaEditar").val(value.cedula);
        }
    }
}