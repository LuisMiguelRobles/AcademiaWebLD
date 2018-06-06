let profesores = [];

let cedulaEdit;
$(function () {

    obtenerProfesores();
   
});

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
        profesores = data;
        
        if (data) {
            console.log(data);
            renderizarTablaProfesores(data);
        }
    }).fail(function (error) {
        alert("No se recibio respuesta del Servidor..." + error);
        console.log(error);
    });

    $('#addProfesor').click(function () {
        agregarDocente();
    });

    $('#editarProfesor').click(function () {
        editar();
        //limpiarCampos();
    });
}

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
                        <button class="btn btn-info" data-toggle="modal" data-target="#modalProfesoresEditar" onclick="llenarCamposEditar(${value.cedula})">Editar</button>
                        <button class="btn btn-danger delete" id="delete" onclick="eliminar(${value.cedula})">Eliminar</button>
                    </div>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#tablaProfesor").html(html);

}

let agregarDocente = () => {
    
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
        renderizarTablaProfesores(data);
        
    })
}




let llenarCamposEditar = (cedulaAEditar) => {

    cedulaEdit = cedulaAEditar;
    for (const iterator of profesores) {
        if (iterator.cedula == cedulaAEditar) {
            $('#nombreProfesorEditar').val(iterator.nombre);
            $('#apellidoProfesorEditar').val(iterator.apellido);
            $('#cedulaProfesorEditar').val(iterator.cedula);
            break;
        }
    }
}

let editar = () => {
    let obj = {};
    obj.nombre = $('#nombreProfesorEditar').val();
    obj.apellido = $('#apellidoProfesorEditar').val();
    obj.cedula = $('#cedulaProfesorEditar').val();

    for (let i = 0; i < profesores.length; i++) {
        if (profesores[i].cedula == cedulaEdit) {
            profesores[i] = obj;
            break;
        }
    }

    renderizar(profesores);
}


function eliminar(cedula) {
    let index;

    for (let value of profesores) {
        if (value.cedula == cedula) {
            index = profesores.indexOf(value);
            profesores.splice(index, 1);
            console.log(profesores);

            renderizar(profesores);

        }
    }
}
