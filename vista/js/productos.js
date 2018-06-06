let productos = [];
const urlProductos = "controlador/fachada.php";

$(function () {

    obtenerProductos();

    $('#agregarProducto').click(function () {
        agregarProducto();
    });

    $('#editarProducto').click(function () {
        editarProducto();
    });

    $('#btnBuscarProductos').click(function () {
        searchProducto();
    });

    $('#btnAtrasProductos').click(function () {
        obtenerProductos();
        $('#btnAtrasProductos').fadeOut();
    });

});

let obtenerProductos = () => {
    $.ajax({
        "url": urlProductos,
        "type": "GET",
        "data": {
            clase: 'Producto',
            oper: 'select'
        },
        "dataType": "JSON",
        "Async": "false"
    }).done(function (data) {
        productos = data;
        //console.log(productos);
        listarProductos();
    }).fail(function (error) {
        alert("No se recibio respuesta del Servidor..." + error);
        console.log(error);
    });
}

let listarProductos = () => {
    if (productos.length != 0) {
        let tablaProductos = `<table class="table table-bordered">`;

        tablaProductos += `<thead class="thead-dark">
                            <tr>
                            <th scope="col">ID Producto</th>
                            <th scope="col">Nombre Producto</th>
                            <th scope="col">Duración</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Numero de Clases</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead><tbody>`;

        for (const producto of productos) {
            tablaProductos += `<tr>
                                    <th>${producto.idproducto}</th>
                                    <td>${producto.nombreproducto}</td>
                                    <td>${producto.duracionproducto}</td>
                                    <td>${producto.categoriaproducto}</td>
                                    <td>${producto.precioproducto}</td>
                                    <td>${producto.numeroclasesproducto}</td>
                                    <td><div class="btn-group">
                                        <button class="btn btn-info" onclick="llamadaEditarProducto(${producto.idproducto})" data-toggle="modal" data-target="#modalEditProducto">Editar</button>
                                        <button class="btn btn-danger" onclick="eliminarProducto(${producto.idproducto})" data-toggle="modal" data-target="#validarEliminarProducto">Eliminar</button>
                                    </div></td>
                                </tr>`;
        }

        tablaProductos += `</tbody></table>`;
        $('#contenedorProductos').html(tablaProductos);
    } else {

        $('#contenedorProductos').html('<div class="alert alert-danger">Nada para Mostrar</div>');
    }
}

let eliminarProducto = (id) => {
    $('#myIDProducto').html(id);
}

let agregarProducto = () => {

    $.ajax({
        "url": urlProductos,
        "type": "POST",
        "data": {
            clase: 'Producto',
            oper: 'add',
            nombreproducto: $('#nombreProducto').val(),
            duracionproducto: $('#duracionProducto').val(),
            categoriaproducto: $('#categoriaProducto').val(),
            precioproducto: $('#precioProducto').val(),
            numeroclasesproducto: $('#clasesProducto').val()
        },
        "dataType": "JSON"

    }).done(function () {
        obtenerProductos();
    }).fail(function (error) {
        alert("Error al intentar agregar el nuevo dato");
    });
}

let confirmarEliminarProducto = (caso) => {
    let idAEliminar = parseInt($('#myIDProducto').text());
    switch (caso) {
        case 1:
            $.ajax({
                "url": urlProductos,
                "type": "POST",
                "data": {
                    clase: 'Producto',
                    oper: 'delete',
                    idproducto: idAEliminar
                }
            }).done(function (data) {
                obtenerProductos();
            }).fail(function (error) {
                alert("No hubo respuesta del Servidor");
            });
            break;
        default:
            console.log("Ok... !!");
    }
}

let llamadaEditarProducto = (idAEditar) => {
    for (const producto of productos) {
        if (producto.idproducto == idAEditar) {
            $('#idProductoAEditar').val(producto.idproducto);
            $('#nombreProductoAEditar').val(producto.nombreproducto);
            $('#duracionProductoAEditar').val(producto.duracionproducto);
            $('#categoriaProductoAEditar').val(producto.categoriaproducto);
            $('#precioProductoAEditar').val(producto.precioproducto);
            $('#clasesProductoAEditar').val(producto.numeroclasesproducto);
            break;
        }
    }
}

let editarProducto = () => {

    let idAeditar = $('#idProductoAEditar').val();

    $.ajax({
        "url": urlProductos,
        "type": "POST",
        "data": {
            clase: 'Producto',
            oper: 'edit',
            idproducto: idAeditar,
            nombreproducto: $('#nombreProductoAEditar').val(),
            duracionproducto: $('#duracionProductoAEditar').val(),
            categoriaproducto: $('#categoriaProductoAEditar').val(),
            precioproducto: $('#precioProductoAEditar').val(),
            numeroclasesproducto: $('#clasesProductoAEditar').val()
        },
        "dataType": "JSON"
    }).done(function () {
        obtenerProductos();
    }).fail(function (error) {
        alert("Error al intentar Editar");
    });

}

let searchProducto = () => {
    let idABuscar = $('#buscarProducto').val();
    if (idABuscar != "") {

        $.ajax({
            "url": urlProductos,
            "type": "GET",
            "data": {
                clase: 'Producto',
                oper: 'select1',
                idproducto: idABuscar
            },
            "dataType": "JSON"
        }).done(function (data) {
            console.log(data);
            if (data) {
                productos = data;
                listarProductos();
            }else{
               $('#contenedorProductos').html('<div class="alert alert-danger">Nada para Mostrar</div>'); 
            }
            $('#btnAtrasProductos').fadeIn();

        }).fail(function (error) {
            alert("No hay respuesta del Servidor");
        });

    } else {
        alert("Ingrese una Cedula para Buscar");
    }
}