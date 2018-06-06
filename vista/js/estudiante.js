let estudiantes = [];
let urlEstudiantes = "controlador/fachada.php";

$(function () {

    /**
     * Llamado a la funcion obtenerEstudiantes
     */
    obtenerEstudiantes();

    /**
     * Llamado de las agregarEstudiante y limpiarAgregarEstudiante cuando el boton agregar es clickeado
     */
    $("#agregarEstudiante").click(function () {
        agregarEstudiante();

        $("#modalEstudiantes").modal('toggle');
        limpiarAgregarEstudiante();
        $("#agregarEstudiante").prop('disabled',true);
    })

    /**
     * Llamado de las editarEstudiante y limpiarEditarEstudiante cuando el boton editar es clickeado
     */
    $("#editarEstudiante").click(function () {
        editarEstudiante();
        $("#modalEstudiantesEditar").modal('toggle');
        limpiarEditarEstudiante();
        $("#editarrEstudiante").prop('disabled',true);
    });

    /**
     * Llamado de la obtenerPorCedula cuando el boton buscar es clickeado
     */
    $("#btnBuscarEstudiante").click(function () {
        obtenerPorCedula();        
        $("#buscarEstudiante").val("");

    });

    $("#btnAtrasEstudiante").click(function () {
        obtenerEstudiantes();
        $("#btnAtrasEstudiante").fadeOut();
    });

    $("#formularioAgregarEstudiante").change(function(){
        $("#agregarEstudiante").prop('disabled',!validarCamposAgregarEstudiante());

    });
    $("#formularioEditarEstudiante").change(function(){
        $("#agregarEstudiante").prop('disabled',!validarCamposEditarrEstudiante());

    });



});


/**
 * Peticion POST al servidor, con la cual se envian nuevos estudiantes
 */
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

    }).done(function () {

        obtenerEstudiantes();   
    }).always(function(){
        obtenerEstudiantes();

    });


}


/**
 * Peticion get el servidor para obtener todos los registros
 */
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


    });

}

/**
 * Renderiza cada uno de los registros obtenidos del servidor
 */

function renderizar(data) {

    let tablaEstudiantes = "";

    tablaEstudiantes = `<table class="table table-bordered ">
                <thead class="thead-dark">
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Opciones</th>
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




/**
 * 
 *Elimina un estudiante seleccionado mediante su documento
 */
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


/**
 * 
 *Llama a una ventana modal en la cual se cargan los datos del estudiante mediante su documento
 */
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
/**
 *  Modifica solo un estudiante 
 */

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
        "url": urlEstudiantes,
        "type": "POST",
        "data": data,
        "dataType": "JSON",


    }).done(function (data) {


        obtenerEstudiantes();
    });
}



/**
 * Obtiene solo un estudiante y lo muestra en la tabla de estudiantes
 */

function obtenerPorCedula() {

    $.ajax({

        "url": urlEstudiantes,
        "type": "GET",
        "data": {
            clase: "Estudiante",
            oper: "select1",
            documentoEstudiante: $("#buscarEstudiante").val()

        },
        "dataType": "JSON"
    }).done((data) => {
        console.log(data);
        if (data) {
            estudiantes = data;
            renderizar(estudiantes);
            $("#btnAtrasEstudiante").fadeIn();
        } else {
            alert("No se encontro ningun registro");
        }


    });
}

/**
 * Valida que los campos para agregar un nuevo estudiante no queden vacios
 */
function validarCamposAgregarEstudiante() {

    return $("#documentoEstudiante").val() != "" &&
        $("#nombreEstudiante").val() != "" &&
        $("#apellidoEstudiante").val() != "" &&
        $("#fechaNacimiento").val() != "" &&
        $("#direccion").val() != "" &&
        $("#telefono").val() != "" &&
        $("#correo").val() != "";

}


/**
 * 
 * Valida que los campos para Editar un nuevo estudiante no queden vacios
 */
function validarCamposEditarrEstudiante() {

    return $("#documentoEstudianteEditar").val() != "" &&
        $("#nombreEstudianteEditar").val() != "" &&
        $("#apellidoEstudianteEditar").val() != "" &&
        $("#fechaNacimientoEditar").val() != "" &&
        $("#direccionEditar").val() != "" &&
        $("#telefonoEditar").val() != "" &&
        $("#correoEditar").val() != "";

}

/**
 * limpia los campos ingresados para agregar un nuevo estudiante
 */
function limpiarAgregarEstudiante() {

    $("#documentoEstudiante").val("");
    $("#nombreEstudiante").val("");
    $("#apellidoEstudiante").val("");
    $("#fechaNacimiento").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#correo").val("");
}

/**
 * limpia los campos ingresados para editar un nuevo estudiante
 */
function limpiarEditarEstudiante() {

    $("#documentoEstudianteEditar").val("");
    $("#nombreEstudianteEditar").val("");
    $("#apellidoEstudianteEditar").val("");
    $("#fechaNacimientoEditar").val("");
    $("#direccionEditar").val("");
    $("#telefonoEditar").val("");
    $("#correoEditar").val("");
}