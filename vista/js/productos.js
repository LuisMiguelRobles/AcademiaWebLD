let productos = [];
const url = "controlador/fachada.php";

$(function(){

    obtenerProductos();


});

let obtenerProductos = () =>{
    $.ajax({
        "url": url,
        "type": "GET",
        "data": {
            clase : 'Producto',
            oper : 'select'
        },
        "dataType": "JSON",
        "Async": "false"
    }).done(function (data) {
        productos = data;
        console.log(productos);
    }).fail(function (error) {
        alert("No se recibio respuesta del Servidor..." + error);
        console.log(error);
    });
}