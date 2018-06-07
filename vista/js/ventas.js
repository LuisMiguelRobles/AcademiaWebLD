let clases =[];
$(function() {
    	let estudiantesventas = [];
    	let profesoresventas = [];
    	let vehiculosventas = [];
        let productosventas = [];
    	obtenerEstudiantesventas();
    	obtenerProfesoresventas();
    	obtenerVehiculosventas();
        obtenerProductosventas();
        obtenerClases();

       $("#agrego").click(function () {
            agregarVentas();
            limpiarCamposVentaAgregar();
            $('#modalVentas').modal('toggle');
        });

       $("#editarclase").click(function () {
            editarclases();
            $('#modaleditarVentas').modal('toggle');
        });
       $("#btnBuscarclases").click(function () {
            obtenerClasesId();
        });
       $("#btnAtrasclases").click(function () {
            obtenerClases();
            $("#btnAtrasclases").fadeOut();
        });
});

function obtenerEstudiantesventas() {

    $.ajax({
        "url": "controlador/fachada.php",
        "type": "GET",
        "data": {
            clase: "Estudiante",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {
    	let html ="";
        if (data) {
            console.log(data);
            estudiantesventas = data;
           	for (estudiante of estudiantesventas){
           		html = html + " <option value ="+estudiante.documentoestudiante+">"+estudiante.nombreestudiante +"</option>"

           	}
           	$("#seleccionarEstudiante").html(html);
            $("#seleccionarEstudianteeditar").html(html);
           	
        }


    }).always(function (data) {

    });

}
function obtenerProfesoresventas() {

    $.ajax({
        "url": "controlador/fachada.php",
        "type": "GET",
        "data": {
            clase: "Profesor",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {
    	let html ="";
        if (data) {
            console.log(data);
            profesoresventas = data;
           	for (profesor of profesoresventas){
           		html = html + " <option value ="+profesor.cedulaprofesor+">"+profesor.nombreprofesor +"</option>"

           	}
           	$("#seleccionarProfesor").html(html);
            $("#seleccionarProfesoreditar").html(html);
           	
        }


    }).always(function (data) {

    });

}
function obtenerVehiculosventas() {

    $.ajax({
        "url": "controlador/fachada.php",
        "type": "GET",
        "data": {
            clase: "Vehiculo",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {
    	let html ="";
        if (data) {
            console.log(data);
            vehiculosventas = data;
           	for (vehiculo of vehiculosventas){
           		html = html + " <option value ="+vehiculo.idvehiculo+">"+vehiculo.placa +" " + vehiculo.modelo+"</option>"

           	}
           	$("#seleccionarVehiculo").html(html);
            $("#seleccionarVehiculoeditar").html(html);
           	
        }


    }).always(function (data) {

    });

}
function obtenerProductosventas() {

    $.ajax({
        "url": "controlador/fachada.php",
        "type": "GET",
        "data": {
            clase: "Producto",
            oper: "select"
        },
        "dataType": "JSON"

    }).done(function (data) {
      let html ="";
        if (data) {
            console.log(data);
            productosventas = data;
            for (producto of productosventas){
              html = html + " <option value ="+producto.idproducto+">"+producto.nombreproducto +" " + producto.categoriaproducto+"</option>"

            }
            $("#seleccionarProductoventas").html(html);
            $("#seleccionarProductoventaseditar").html(html);
            
        }


    }).always(function (data) {

    });

}
function agregarVentas() {

    $.ajax({
        "url": urlEstudiantes,
        "type": "POST",
        "data": {
            clase: "Clase",
            oper: "add", 
            fecha: $("#horarios").val(),
            hora: "00:00",
            estudiante: $("#seleccionarEstudiante").val(),
            profesor: $("#seleccionarProfesor").val(),
            vehiculo: $("#seleccionarVehiculo").val(),
            producto: $("#seleccionarProductoventas").val(),
           
        },
        "dataType": "JSON"

    }).done(function (data) {
        console.log(data);
        obtenerClases();
    }).always((data) => {
        console.log(data);
    });


}

function obtenerClases() {

    $.ajax({
        "url": urlEstudiantes,
        "type": "GET",
        "data": {
            clase: "Clase",
            oper: "select"
                     
        },
        "dataType": "JSON"

    }).done(function (data) {
        if (data) {
          clases = data;
          console.log(clases);
          listarVentas(data);
        }else{
          console.log("no hay datos");
        }
    }).always((data) => {
        console.log(data);
    });


}

function listarVentas(data) {

    let tablaventas = "";

    tablaventas = `<table class="table table-bordered ">
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estudiante</th>
                        <th>Profesor</th>
                        <th>Vehiculo</th>
                        <th>Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead><tbody>`;

    $.each(data, function (key, value) {
        tablaventas +=
            `<tr>
                <td>${value.id}</td>
                <td>${value.fecha}</td>
                <td>${value.hora}</td>
                <td>${value.estudiante}</td>
                <td>${value.vehiculo}</td>
                <td>${value.profesor}</td>
                <td>${value.producto}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-info" data-toggle="modal" data-target="#modaleditarVentas" onclick="modalEditarclase(${value.id})">Editar</button>
                        <button class="btn btn-danger delete" id="delete" onclick="eliminarclase(${value.id})" data-toggle="modal" data-target="#validarEliminarclases" >Eliminar</button>
                    </div>     
                </td>
            </tr>`;
    });
    tablaventas += `</tbody></table>`;
    $("#tablaventas").html(tablaventas);

}
let eliminarclase= (id) =>
{
    $('#myIDclases').html(id);
}
let confirmarEliminarclases = ()=> 
{
    let ideliminar = $('#myIDclases').text();
    $.ajax({
        "url": urlEstudiantes,
        "type": "POST",
        "data": {
            clase: "Clase",
            oper: "delete",
            id: ideliminar   
        },
        "dataType": "JSON"

    }).done(function (data) {
        obtenerClases();
    }).always((data) => {
        console.log(data);
    });
}

function limpiarCamposVentaAgregar() {
    
    $('#horarios').val('');
    $('##seleccionarEstudiante').val('');
    $('#seleccionarProfesor').val('');
    $('#seleccionarVehiculo').val('');
    $('#seleccionarProductoventas').val('');
}

let modalEditarclase = (id) =>
{
    for (const clase of clases) {
        if (clase.id == id) {
            $('#ideditar').val(clase.id);
            $('#seleccionarEstudianteeditar').val(clase.estudiante);
            $('#seleccionarProfesoreditar').val(clase.profesor);
            $('#seleccionarVehiculoeditar').val(clase.vehiculo);
            $('#horarioseditar').val(clase.fecha);
            $('#seleccionarProductoventaseditar').val(clase.producto);
            break;
        }
    }
}

let editarclases = () => {

    let idAeditar = $('#ideditar').val();

    $.ajax({
        "url": "controlador/fachada.php",
        "type": "POST",
        "data": {
            clase: 'Clase',
            oper: 'edit',
            id: idAeditar,
            fecha: $('#horarioseditar').val(),
            hora: "02:00",
            estudiante: $('#seleccionarEstudianteeditar').val(),
            profesor: $('#seleccionarProfesoreditar').val(),
            vehiculo: $('#seleccionarVehiculoeditar').val(),            
            producto: $('#seleccionarProductoventaseditar').val()
        },
        "dataType": "JSON"
    }).done(function () {
        obtenerClases();
    }).fail(function (error) {
        alert("Error al intentar Editar");
    });

}

let obtenerClasesId =() =>
{
    let buscarclasesid = $('#buscarclases').val();

    if (buscarclasesid != "") {
        $.ajax({
            "url": "controlador/fachada.php",
            "type": "GET",
            "data": {
                clase: 'Clase',
                oper: 'select1',
                id: buscarclasesid
            },
            "dataType": "JSON"
        }).done(function (data) {
            if (data) {
                clases = data;
                listarVentas(clases);
                $("#btnAtrasclases").fadeIn();
            }else{
                alert("No existe");
            }
        }).fail(function (error) {
            alert("Error al intentar buscar");
        });
    }
}