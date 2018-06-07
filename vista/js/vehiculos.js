let vehiculos = [];
let urlVehiculos = "controlador/fachada.php";

$(function () {
    obtenerVehiculos();

    $('#btnBuscarVehiculos').click(function() {
        buscarVehiculo();
    });

    $('#btnAtrasVehiculos').click(function() {
        obtenerVehiculos();
        $('#btnAtrasVehiculos').fadeOut();
    });

    $('#addVehiculo').click(function() {
        agregarVehiculo();
        $('#modalVehiculo').modal('toggle');
    });

    $('#editarVehiculo').click(function() {
        editarVehiculo();
    });

    $('#confirmacionEliminacionVehiculo').click(function() {
        confirmarEliminarVehiculo();
        $('#modalEliminarVehiculo').modal('toggle');
    });
});

let obtenerVehiculos = () => {
    $.ajax({
        "url": urlVehiculos,
        "type": "GET",
        "data": {
            clase: 'Vehiculo',
            oper: 'select'
        },
        "dataType": "JSON",
        "Ansync": "false"
    }).done(function (data) {
        if(data) {
            vehiculos = data;
            console.log(data);
            renderizarTablaVehiculos(data);
        }
    }).fail(function (error) {
        alert("¡Atención! El servidor no responde" + error);
        console.log(error);
    }).always(function (data){
        renderizarTablaVehiculos(data);
    });
}

function renderizarTablaVehiculos(data) {
    let html = `<table class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Opciones</th>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        html +=
            `<tr>
                <td>${value.idvehiculo}</td>
                <td>${value.placa}</td>
                <td>${value.modelo}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#modalEditVehiculo" onclick="editarVehiculo(${value.idvehiculo})">Editar</button>
                    <button class="btn btn-danger" data-toggle="modal" data-target="#modalEliminarVehiculo" onclick="eliminarVehiculo(${value.idvehiculo})">Eliminar</button>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#contenedorVehiculos").html(html);
}

let agregarVehiculo = () => {
    $.ajax({
        "url" : urlVehiculos,
        "type": "POST",
        "data": {
            clase: 'Vehiculo',
            oper: 'add',
            placa: $('#placaVehiculo').val(),
            modelo: $('#modeloVehiculo').val()
        },
        "dataType": "JSON"
    }).done(function() {
        obtenerVehiculos();
    }).fail(function(error) {
        alert("Lo sentimos se a producido un error");
    }).always(function() {
        obtenerVehiculos();
    });
}

function eliminarVehiculo(eliminarIDVehiculo) {

    $("#eliminarAVehiculo").html(eliminarIDVehiculo);
}

function confirmarEliminarVehiculo() {
    let vehiculosEliminar = parseInt($("#eliminarAVehiculo").text());
    $.ajax({
        "url":urlVehiculos,
        "type": "POST",
        "data": {
            clase: "Vehiculo",
            oper: "delete",
            idvehiculo: vehiculosEliminar
        }
    }).done((data) => {
        obtenerVehiculos();
    });
}

function buscarVehiculo() {
    let buscarVehiculo = $('#buscarVehiculo').val();

    console.log(buscarVehiculo);

    if (buscarVehiculo != '') {
        $.ajax({
            "url": urlVehiculos,
            "type": "GET",
            "data": {
                clase: "Vehiculo",
                oper: 'select1',
                idvehiculo: buscarVehiculo
            },
            "dataType": "JSON"
        }).done(function (data) {
            console.log(data);
            if(data) {
                vehiculos = data;

                renderizarTablaVehiculos(data);
            } else {
                $('#contenedorVehiculos').html('<div class="alert alert-danger">Nada que mostrar</div>');
            }
            $('btnAtrasVehiculos').fadeIn();
        }).fail(function (error) {
            alert("No hay respuesta del servidor" + error);
            console.log(error);
        });
    } else {
        alert("No ha ingresado el ID");
    }
}

function editarVehiculo() {
    $.ajax({
        "url": urlVehiculos,
        "type": "POST",
        "data": {
            clase: 'Vehiculo',
            oper: 'edit',
            placa: $('#placaVehiculoAEditar').val(),
            modelo: $('#modeloVehiculoAEditar').val()
        },
        "dataType": "JSON"
    }).done(function(data) {
        console.log(data);
        obtenerVehiculos();
    }).fail(function(error) {
        alert("Se presento un error");
    })
}