
/**
 * Este archivo es el medio que comunica la vista con el Controlador
 * autor Diego Alejandro Bustamante
 */
let productos = []; // Este arreglo almacena los datos que recive del Controlador
const urlProductos = "controlador/fachada.php"; //Esta es la dirección del controlador

$(function () {

    obtenerProductos(); //llamada al metodo que obtiene los productos desde el controlador
    
    $('#agregarProducto').click(function () {
        agregarProducto(); //lamada al metodo que agrega un registro con una solicitud al controlador
        limpiarCamposAgregarProductos(); //Una vez agrega, se limpian los campos del Formulario de Agregar Producto
        $('#modalProductos').modal('toggle'); //Cierra el modal despues de agregar
        $('#agregarProducto').prop('disabled' , true); //Al agregar me deshabilita el boton para evitar problemas con campos vacios
    });

    $('#editarProducto').click(function () {
        editarProducto(); //lamada al metodo que edita un registro con una solicitud al controlador
    });

    $('#btnBuscarProductos').click(function () {
        searchProducto(); //lamada al metodo que busca un registro mediante el id con una solicitud al controlador
    });

    $('#btnAtrasProductos').click(function () {
        obtenerProductos(); //Al oprimir este boton me debe mostrar nuevamente todos los registros que envia el Controlador
        $('#btnAtrasProductos').fadeOut(); //Al aparecer todos los campos nuevamente. Este boton debe desaparecer otra vez
    });

    $('#formularioProductos').change(function(){
        /**
         * Cada vez que se modifique un input del formulario de agregar, se validara que estos no esten vacios
         * Al estar todos los campos rellenos se habilitara el boton, de lo contrario, permanecera deshabilitado.
         */
        $('#agregarProducto').prop('disabled' , !validarCamposAgregarProductos()); 
    });

});


/**
 * Este metodo le hace una solicitud al controlador que me permite consultar todos los registros de productos existentes en la DB
 * Si la respuesta de datos es exitosa y me retorna 1 ó mas registros seran almacenados en la variable productos
 */
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
        if (data) {
            productos = data;
            //console.log(productos);
            listarProductos();
        } else {
            $('#contenedorProductos').html('<div class="alert alert-danger">Nada para Mostrar</div>');
        }

    }).fail(function (error) {
        alert("No se recibio respuesta del Servidor..." + error);
        console.log(error);
    });
}

/**
 * Este metodo me permite que, si existen registros, me cree una tabla dinámicamente que me lista cada uno de los registros existentes en la base de datos
 * Ademas, agrega dos botones que me permiten las opciones de editar y eliminar cada uno enviandole a su respectivo metodo el id del registro al que representa.
 */

let listarProductos = () => {
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
}

/**
 * Este metodo toma los datos introducidos en el formulario y se los envia al controlador 
 * de tal modo que este ejecute los cambios en la DB y agregue el registro.
 */

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

/**
 * Al oprimir el boton eliminar de cualquier registro antes de llamar al modal me permite que se agregue a un span que permanece oculto el id que deseo eliminar
 * para facilitar el envio de datos al controlador.
 */

let eliminarProducto = (id) => {
    $('#myIDProducto').html(id);
}

/**
 * Este metodo se encarga de Eliminar el registro una vez se confirme
 * El id lo obtengo de un span escondido el cual almacena el id a eliminar
 */

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

/**
 * Una vez se oprime el boton editar de cualquier registro, me llama este metodo que me permite mostrar en los campos del formulario editar los datos
 * pertenecientes al registro que busco editar.
*/

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


/**
 * Despues que se llama el modal, cuando se clickea en Guardar Cambios se activa este metodo
 * Este envia los datos al controlador con los cambios que seran aplicados en la DB.
 */

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

/**
 * Este metodo me permite limpiar los campos del formulario de Agregar Estudiantes
 */
let limpiarCamposAgregarProductos = () => {
    $('#nombreProducto').val('');
    $('#duracionProducto').val('');
    $('#categoriaProducto').val('Undefined');
    $('#precioProducto').val('');
    $('#clasesProducto').val('');
}

/**
 * Esta funcion retorna falso o verdadero lo que me permite saber si los campos si fueron completados
 */
let validarCamposAgregarProductos = () => {
    return $('#nombreProducto').val() != '' &&
        $('#duracionProducto').val() != '' &&
        $('#categoriaProducto').val() != 'Undefined' &&
        $('#precioProducto').val() != '' &&
        $('#clasesProducto').val() != '';
}


/** 
 * Este metodo me permite buscar un registro por el ID del Producto.
 * El ID se obtiene mediante un input del HTML
 * Si se encuentra exitosamente un registro, el controlador envia un JSON que contiene el resultado de busqueda por eso
 * se asigna a la variable productos la busqueda que despues sera mostrada al usuario mediante el metodo listarProductos.
 * 
 * De no encontrar un registro me mostrara en el html que no existe ningun campo.
*/
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
            } else {
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