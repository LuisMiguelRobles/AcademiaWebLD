let estudiantes = [];
let urlEstudiantes = "controlador/fachada.php";

$(function () {

    obtenerEstudiantes();

    $("#agregarEstudiante").click(function () {
        agregarEstudiante();
    })

    $("#editarEstudiante").click(function () {
        editarEstudiante();
    });
    $("#btnBuscarEstudiante").click(function () {
        obtenerPorCedula();
        console.log($("#buscarEstudiante").val());
        $("#buscarEstudianteEditar").val("");
        $("#consultaEstudiante").show();
    });



});

function obtenerEstudiantes() {

    $.ajax({
        "url": urlEstudiantes,
        "type": "GET",
        "data": {
            clase: "Estudiante",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {

        if (data) {
            console.log(data);
            estudiantes = data;
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
                        <button class="btn btn-info" data-toggle="modal" data-target="#modalEstudiantesEditar" onclick="modalEditarEstudiante(${value.documentoestudiante})">Editar</button>
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
        "url": urlEstudiantes,
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

function eliminarEstudiante(documentoestudiante) {

    $.ajax({
        "url": urlEstudiantes,
        "type": "POST",
        "data": {
            clase: "Estudiante",
            oper: "delete",
            documentoestudiante: documentoestudiante
        }

    }).done((data) => {

        obtenerEstudiantes();

    });

}


function modalEditarEstudiante(documentoestudiante) {


    for (let estudiante of estudiantes) {
        if (estudiante.documentoestudiante == documentoestudiante) {
            console.log(estudiante.documentoestudiante);

            $("#documentoEstudianteEditar").val(estudiante.documentoestudiante);
            $("#nombreEstudianteEditar").val(estudiante.nombreestudiante);
            $("#apellidoEstudianteEditar").val(estudiante.apellidoestudiante);
            $("#fechaNacimientoEditar").val(estudiante.fechanacimiento);
            $("#direccionEditar").val(estudiante.direccion);
            $("#telefonoEditar").val(estudiante.telefono);
            $("#correoEditar").val(estudiante.correo);

        }
    }
}

function editarEstudiante() {
    data = {
        clase: "Estudiante",
        oper: "Edit",
        documentoestudiante: $("#documentoEstudianteEditar").val(),
        nombreEstudiante: $("#nombreEstudianteEditar").val(),
        apellidoEstudiante: $("#apellidoEstudianteEditar").val(),
        fechaNacimiento: $("#fechaNacimientoEditar").val(),
        direccion: $("#direccionEditar").val(),
        telefono: $("#telefonoEditar").val(),
        correo: $("#correoEditar").val()
    }


    $.ajax({
        "url": url,
        "type": "POST",
        "data": data,
        "dataType": "JSON",


    }).done(function (data) {

        obtenerEstudiantes();
    }).always(() => {

        console.log(data);
    });
}



/*function obtenerPorDocumento(documento) {

    $.ajax({

        "url": url,
        "type": "GET",
        "data": {
            clase: "Estudiante",
            oper: "select1",
            documentoestudiante: documento

        },
        "dataType": "JSON"
    }).done(function (value) {
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
                            <button class="btn btn-info" data-toggle="modal" data-target="#modalEstudiantesEditar" onclick="modalEditarEstudiante(${value.documentoestudiante})">Editar</button>
                            <button class="btn btn-danger delete" id="delete" onclick="eliminarEstudiante(${value.documentoestudiante})">Eliminar</button>
                        </div>     
                    </td>
                </tr>`;


        tablaEstudiantes += `</table><br><button class="btn btn-default" onclick="atras()">Atras</button>`;
        $("#renderizarEstudiante").hide();

        $("#consultaEstudiante").html(tablaEstudiantes);


        $("#renderizarEstudiante").html(tablaEstudiantes);






    });
}*/


function obtenerPorCedula() {
    alert("hola")

    $.ajax({

        "url": url,
        "type": "GET",
        "data": {
            clase: "Estudiante",
            oper: "select1",
            documentoestudiante: $("#buscarEstudiante").val()

        },
        "dataType": "JSON"
    }).done(function (data) {

        let html;

        if (data) {
            html = `<table class="table table-bordered table-striped table-dark ">
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


            html +=
                `<tr>
                <td>${data.documentoestudiante}</td>
                <td>${data.nombreestudiante}</td>
                <td>${data.apellidoestudiante}</td>
                <td>${data.fechanacimiento}</td>
                <td>${data.direccion}</td>
                <td>${data.telefono}</td>
                <td>${data.correo}</td>
            <td>
            <div class="btn-group">
            <button class="btn btn-info" data-toggle="modal" data-target="#modalEstudiantesEditar" onclick="modalEditarEstudiante(${data.documentoestudiante})">Editar</button>
            <button class="btn btn-danger delete" id="delete" onclick="eliminarEstudiante(${data.documentoestudiante})">Eliminar</button>
        </div>  
            </td>
        </tr>`;

            html += `</table><br><button class="btn btn-default" onclick="atras()">Atras</button>`;
            $("#renderizarEstudiante").hide();

            $("#consultaEstudiante").html(html);




        }
        console.log(data);
    });
}

function atras() {
    $("#renderizarEstudiante").show();
    $("#consultaEstudiante").hide();
}