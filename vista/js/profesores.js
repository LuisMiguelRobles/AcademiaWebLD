let profesores = [];

$(function () {

    obtenerProfesores();

    $('#addProfesor').click(function () {
        agregarDocente();
        limpiarCamposProfesoresAgregar();
    });

    $('#editarProfesor').click(function () {
        editarDocente();
        limpiarCamposProfesoresEditar();
    });

    $('#btnBuscarDocente').click(function(){
        buscarProfesor();
        
    });

    $('#btnAtrasProfesor').click(function(){
        obtenerProfesores();
        $('#btnAtrasProfesor').fadeOut();
    })
});

/**
 * Obtiene todos los profesores que se encuentren en la base de datos
 */
function obtenerProfesores() {
     /**
     * Peticion Get al Servidor
     */
    $.ajax({

        "url": "controlador/fachada.php",
        "type": "GET",
        "data": {
            clase :'Profesor',
            oper: 'select'
        },
        "dataType": "JSON",
        "Async": "false"

    }).done(function (data) {
        
        if (data) {
            profesores = data;

            console.log(data);
            renderizarTablaProfesores(data);
        }

    }).fail(function (error) {
        alert("No se recibio respuesta del Servidor..." + error);
        console.log(error);
    });
}

/**
 * Llena la tabla de profesores con la cantidad de profesores 
 * que están llegando de la base de datos
 * 
 * @param {profesores} data 
 */
function renderizarTablaProfesores(data) {

    let html = `<table class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de nacimiento</th>
                        <th>Direccion</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Profesión</th>
                        <th>Acciones</th>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        html +=
            `<tr>
                <td>${value.cedulaprofesor}</td>
                <td>${value.nombreprofesor}</td>
                <td>${value.apellidoprofesor}</td>
                <td>${value.fechanacimiento}</td>
                <td>${value.direccionprofesor}</td>
                <td>${value.telefonoprofesor}</td>
                <td>${value.correoprofesor}</td>
                <td>${value.profesionprofesor}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-info" data-toggle="modal" data-target="#modalProfesoresEditar" onclick="llenarCamposEditarProfesores(${value.cedulaprofesor})">Editar</button>
                        <button class="btn btn-danger delete" id="delete" data-toggle="modal" data-target="#validarEliminarProfesor" onclick="eliminarProfesor(${value.cedulaprofesor})">Eliminar</button>
                    </div>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#tablaProfesor").html(html);

}

/**
 * Toma la informacion del modalEditarDocente y la agrega a la base de datos como un
 * nuevo docente
 */
function agregarDocente()  {
    
    $.ajax({

        "url": "controlador/fachada.php",
        "type": "POST",
        "data": {
            clase :'Profesor',
            oper: 'add',
            cedulaprofesor : $('#cedulaProfesor').val(),
            nombreprofesor : $('#nombreProfesor').val(),
            apellidoprofesor : $('#apellidoProfesor').val(),
            fechanacimiento : $('#fechaNacimientoProfesor').val(),
            direccionprofesor : $('#direccionProfesor').val(),
            telefonoprofesor : $('#telefonoProfesor').val(),
            correoprofesor : $('#correoProfesor').val(),
            profesionprofesor : $('#profesionProfesor').val()
        },
        "dataType": "JSON"
    }).done(function(data){

        console.log(data);
        obtenerProfesores();
        
    }).fail(function(){
        alert("Ha ocurrido un error");
    })
}

/**
 * Llena el modalEditar con la informacion del profesor que 
 * se va a modificar
 * 
 * @param {cedula que se va a modificar} cedulaAEditar 
 */
let llenarCamposEditarProfesores = (cedulaAEditar) => {

    for (const profesor of profesores) {
        if (profesor.cedulaprofesor == cedulaAEditar) {
            $('#cedulaProfesorEditar').val(profesor.cedulaprofesor);
            $('#nombreProfesorEditar').val(profesor.nombreprofesor);
            $('#apellidoProfesorEditar').val(profesor.apellidoprofesor);
            $('#fechaNacimientoProfesorEditar').val(profesor.fechanacimiento);
            $('#direccionProfesorEditar').val(profesor.direccionprofesor);
            $('#telefonoProfesorEditar').val(profesor.telefonoprofesor);
            $('#correoProfesorEditar').val(profesor.correoprofesor);
            $('#profesionProfesorEditar').val(profesor.profesionprofesor);

            break;
        }
    }
}

/**
 * Toma los nuevos valores el modalEditar y los asigna al profesor que se 
 * está editando
 */
function editarDocente() {

   $.ajax({

        "url": "controlador/fachada.php",
        "type": "POST",
        "data": {
            clase :'Profesor',
            oper: 'edit',
            nombreprofesor  : $('#nombreProfesorEditar').val(),
            apellidoprofesor : $('#apellidoProfesorEditar').val(),
            fechanacimiento : $('#fechaNacimientoProfesorEditar').val(),
            direccionprofesor : $('#direccionProfesorEditar').val(),
            telefonoprofesor : $('#telefonoProfesorEditar').val(),
            correoprofesor : $('#correoProfesorEditar').val(),
            profesionprofesor : $('#profesionProfesorEditar').val(),
            cedulaprofesor : $('#cedulaProfesorEditar').val()
        },
        "dataType": "JSON"
    }).done(function(data){

        console.log(data);
        obtenerProfesores();
        
    }).fail(function(error){
        alert("Hay un error");
    })
}

/**
 * Asigna a un span invisible la cedula del profesor que se quiere eliminar
 * 
 * @param {cedula} cedulaProfesorEliminar 
 */
function eliminarProfesor(cedulaProfesorEliminar) {

    $("#cedulaProfesorAEliminar").html(cedulaProfesorEliminar);

}

/**
 * Confirma la eliminacion del profesor
 */
function confirmarEliminarProfesor() {
    let docenteEliminar = parseInt($('#cedulaProfesorAEliminar').text());
    $.ajax({
        "url":"controlador/fachada.php",
        "type": "POST",
        "data": {
            clase: "Profesor",
            oper: "delete",
            cedulaprofesor: docenteEliminar
        }

    }).done((data) => {

        obtenerProfesores();

    });
}

/**
 * Toma el valor de la cedula que se escribe en el input
 * y la elimina de la base de datos
 */
function buscarProfesor() {
    let buscarProfesor = $('#buscarCedulaDocente').val();

    console.log(buscarProfesor);

    if (buscarProfesor != '') {
        $.ajax({

            "url": "controlador/fachada.php",
            "type": "GET",
            "data": {
                clase :'Profesor',
                oper: 'select1',
                cedulaprofesor : buscarProfesor
            },
            "dataType": "JSON"
    
        }).done(function (data) {
            console.log(data);
            if (data) {
                profesores = data;
                
                renderizarTablaProfesores(data);
            } else {
                $('#tablaProfesor').html('<div class="alert alert-danger">Nada para Mostrar</div>');
            }
            $('#btnAtrasProfesor').fadeIn();
    
        }).fail(function (error) {
            alert("No se recibio respuesta del Servidor..." + error);
            console.log(error);
        }); 
    } else {
        alert("No se ha ingresado la cedula");
    }
}

function limpiarCamposProfesoresAgregar() {
    cedulaprofesor : $('#cedulaProfesor').val('');
    nombreprofesor : $('#nombreProfesor').val('');
    apellidoprofesor : $('#apellidoProfesor').val('');
    fechanacimiento : $('#fechaNacimientoProfesor').val('');
    direccionprofesor : $('#direccionProfesor').val('');
    telefonoprofesor : $('#telefonoProfesor').val('');
    correoprofesor : $('#correoProfesor').val('');
    profesionprofesor : $('#profesionProfesor').val('');
}

function limpiarCamposProfesoresEditar() {
    $('#cedulaProfesorEditar').val('');
    $('#nombreProfesorEditar').val('');
    $('#apellidoProfesorEditar').val('');
    $('#fechaNacimientoProfesorEditar').val('');
    $('#direccionProfesorEditar').val('');
    $('#telefonoProfesorEditar').val('');
    $('#correoProfesorEditar').val('');
    $('#profesionProfesorEditar').val('');
}
