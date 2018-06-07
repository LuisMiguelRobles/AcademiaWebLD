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
    })
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
            profesor: $("#seleccionarProfesor").val(),
            vehiculo: $("#seleccionarVehiculo").val(),
            producto: $("#seleccionarProductoventas").val(),
           
        },
        "dataType": "JSON"

    }).done(function (data) {
        console.log(data);
        obtenerEstudiantesventas();
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
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estudiante</th>
                        <th>Profesor</th>
                        <th>Vehiculo</th>
                        <th>Producto</th>
                        <th>acciones</th>
                    </tr>
                </thead><tbody>`;

    $.each(data, function (key, value) {
        tablaventas +=
            `<tr>
                <td>${value.fecha}</td>
                <td>${value.hora}</td>
                <td>${value.estudiante}</td>
                <td>${value.vehiculo}</td>
                <td>${value.profesor}</td>
                <td>${value.producto}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-info" data-toggle="modal" data-target="#modalEstudiantesEditar" onclick="modalEditarEstudiante(${value.documentoestudiante})">Editar</button>
                        <button class="btn btn-danger delete" id="delete" onclick="eliminarEstudiante(${value.documentoestudiante})">Eliminar</button>
                    </div>     
                </td>
            </tr>`;
    });
    tablaventas += `</tbody></table>`;
    $("#tablaventas").html(tablaventas);

}
