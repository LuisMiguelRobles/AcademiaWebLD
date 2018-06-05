let profesores = [];

let cedulaEdit;
$(function () {


    /**
     * Peticion Get al Servidor
     */
    $.ajax({

        "url": "vista/json/profesores.json",
        "type": "GET",
        "data": {},
        "dataType": "JSON"


    }).done(function (data) {
        profesores = data;
        if (data) {
            console.log(data);
            renderizar(data);
        }
    });

    $('#add').click(function () {
        agregar();
        renderizar(profesores);
    });

    $('#editar').click(function () {
        editar();
        //limpiarCampos();
    });

});

let agregar = () => {
    let obj = {};
    obj.nombre = $('#nombreProfesor').val();
    obj.apellido = $('#apellidoProfesor').val();
    obj.cedula = $('#cedulaProfesor').val();

    profesores.push(obj);
}


function renderizar(data) {


    let html = `<table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cedula</th>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        html +=
            `<tr>
                <td>${value.nombre}</td>
                <td>${value.apellido}</td>
                <td>${value.cedula}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#modalProfesoresEditar" onclick="llenarCamposEditar(${value.cedula})">Editar</button>
                    <button class="btn btn-danger delete" id="delete" onclick="eliminar(${value.cedula})">Eliminar</button>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#render").html(html);

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


// function llenarCamposEditar(cedulaAEditar) {
//     let index;

//     for (let value of profesores) {
//         if (value.cedula == cedulaAEditar) {
//             index = profesores.indexOf(value);
//             $("#nombreProfesorEditar").val(value.nombre);
//             $("#apellidoProfesorEditar").val(value.apellido);
//             $("#cedulaProfesorEditar").val(value.cedula);
//         }
//     }

//     editar();
// }

// let editar = () => {
//     let obj = {};

//     obj.nombre = $('#nombreProfesorEditar').val();
//     obj.apellido = $('#apellidoProfesorEditar').val();
//     obj.cedula = $('#cedulaProfesorEditar').val();

//     for (let i = 0; i < profesores.length; i++) {
//         if (profesores[i].cedula == cedula) {
//             profesores[i] = obj;
//             break;
//         }
//     }

//     renderizar(profesores);
// }


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
