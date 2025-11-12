// ====================== INICIALIZACIÓN =======================
function init() {
    listarProductos();

    // Validaciones al perder foco
    $('#name').on('blur', validarNombre);
    $('#marca').on('blur', validarMarca);
    $('#modelo').on('blur', validarModelo);
    $('#precio').on('blur', validarPrecio);
    $('#detalles').on('blur', validarDetalles);
    $('#unidades').on('blur', validarUnidades);
    $('#imagen').on('blur', validarImagen);

    // Guardar producto
    $('#product-form').on('submit', function (e) {
        e.preventDefault();
        agregarOEditarProducto();
    });

    // Buscar productos
    $('#search').on('keyup', function () {
        buscarProducto($(this).val());
    });
}

// ====================== BARRA DE ESTADO =======================
function mostrarEstado(mensaje, campo) {
    $('#field-status').removeClass('d-none').addClass('card my-4 d-block');

    // Eliminamos mensajes anteriores del mismo campo
    $(`#field-messages li[data-campo="${campo}"]`).remove();

    // Insertamos el nuevo mensaje
    $('#field-messages').append(`<li data-campo="${campo}">${mensaje}</li>`);
}

function limpiarTodosEstados() {
    $('#field-status').addClass('d-none');
    $('#field-messages').html("");
}

// ====================== VALIDACIONES INDIVIDUALES =======================

// NOMBRE
function validarNombre() {
    let nombre = $('#name').val().trim();

    if (nombre === "") {
        mostrarEstado("El nombre es obligatorio", "nombre");
        return false;
    }

    if (nombre.length > 100) {
        mostrarEstado("El nombre debe tener máximo 100 caracteres", "nombre");
        return false;
    }

    // Validar que no exista en BD
    $.ajax({
        url: "./backend/product-search.php",
        type: "GET",
        data: { search: nombre },
        dataType: "json",
        success: function (productos) {
            if (productos.length > 0) {
                mostrarEstado("Ya existe un producto con ese nombre");
            } else {
                mostrarEstado("Nombre disponible", "nombre");
            }
        }
    });

    return true;
}

// MARCA
function validarMarca() {
    let marca = $('#marca').val().trim();

    if (marca === "") {
        mostrarEstado("La marca es obligatoria", "marca");
        return false;
    }
    mostrarEstado("Marca válida", "marca");
    return true;
}

// MODELO
function validarModelo() {
    let modelo = $('#modelo').val().trim();

    if (modelo === "") {
        mostrarEstado("El modelo es obligatorio", "modelo");
        return false;
    }
    if (modelo.length > 25) {
        mostrarEstado("Modelo debe tener máximo 25 caracteres", "modelo");
        return false;
    }
    if (!/^[A-Za-z0-9\-_ ]+$/.test(modelo)) {
        mostrarEstado("Modelo solo puede contener caracteres alfanuméricos", "modelo");
        return false;
    }
    mostrarEstado("Modelo válido", "modelo");
    return true;
}

// PRECIO
function validarPrecio() {
    let precio = $('#precio').val();

    if (precio === "" || isNaN(precio) || Number(precio) <= 99.99) {
        mostrarEstado("El precio debe ser numérico y mayor a 99.99", "precio");
        return false;
    }
    mostrarEstado("Precio válido", "precio");
    return true;
}

// DETALLES
function validarDetalles() {
    let detalles = $('#detalles').val();

    if (detalles && detalles.length > 250) {
        mostrarEstado("Detalles no deben exceder 250 caracteres");
        return false;
    }
    mostrarEstado("Detalles válidos");
    return true;
}

// UNIDADES
function validarUnidades() {
    let unidades = $('#unidades').val();

    if (unidades === "" || isNaN(unidades) || Number(unidades) < 0) {
        mostrarEstado("Unidades deben ser número >= 0", "unidades");
        return false;
    }
    mostrarEstado("Unidades válidas", "unidades");
    return true;
}

// IMAGEN
function validarImagen() {
    let imagen = $('#imagen').val().trim();

    if (imagen === "") {
        mostrarEstado("ℹ No se registró imagen, se usará la imagen por defecto", "imagen");
        return true;
    }
    mostrarEstado("Imagen válida", "imagen");
    return true;
}

// ====================== AGREGAR/EDITAR =======================
function agregarOEditarProducto() {

    limpiarTodosEstados();

    let validaciones = [
        validarNombre(),
        validarMarca(),
        validarModelo(),
        validarPrecio(),
        validarDetalles(),
        validarUnidades()
    ];

    if (validaciones.includes(false)) {
        mostrarEstado("❌ No se puede guardar: hay errores en el formulario", "general");
        return;
    }

    let datos = {
        id: $('#productId').val(),
        nombre: $('#name').val(),
        marca: $('#marca').val(),
        modelo: $('#modelo').val(),
        precio: $('#precio').val(),
        detalles: $('#detalles').val(),
        unidades: $('#unidades').val(),
        imagen: $('#imagen').val()
    };

    if (!datos.imagen.trim()) {
        datos.imagen = "img/default.png";
    }

    let archivo = (datos.id === "") ? 'product-add.php' : 'product-edit.php';

    $.ajax({
        url: './backend/' + archivo,
        type: 'POST',
        data: datos,
        dataType: 'json',
        success: function (resp) {
            alert(resp.message);
            listarProductos();
            limpiarFormulario();
            limpiarTodosEstados();
        }
    });
}

// ====================== LISTAR PRODUCTOS =======================
function listarProductos() {
    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        dataType: 'json',
        success: function (productos) {
            let template = '';

            productos.forEach(producto => {
                let descripcion = `
                    <li>precio: $${producto.precio}</li>
                    <li>unidades: ${producto.unidades}</li>
                    <li>modelo: ${producto.modelo}</li>
                    <li>marca: ${producto.marca}</li>
                    <li>detalles: ${producto.detalles}</li>
                `;

                template += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td><ul>${descripcion}</ul></td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="cargarProducto(${producto.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });

            $('#products').html(template);
        }
    });
}

// ====================== CARGAR PRODUCTO PARA EDITAR =======================
function cargarProducto(id) {
    $.ajax({
        url: './backend/product-single.php',
        type: 'POST',
        data: { id: id },
        dataType: 'json',
        success: function (producto) {
            $('#productId').val(producto.id);
            $('#name').val(producto.nombre);
            $('#marca').val(producto.marca);
            $('#modelo').val(producto.modelo);
            $('#precio').val(producto.precio);
            $('#detalles').val(producto.detalles);
            $('#unidades').val(producto.unidades);
            $('#imagen').val(producto.imagen);
        }
    });
}

// ====================== ELIMINAR =======================
function eliminarProducto(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    $.ajax({
        url: './backend/product-delete.php',
        type: 'POST',
        data: { id: id },
        dataType: 'json',
        success: function (resp) {
            alert(resp.message);
            listarProductos();
        }
    });
}

// ====================== LIMPIAR FORMULARIO =======================
function limpiarFormulario() {
    $('#productId').val("");
    $('#name').val("");
    $('#marca').val("");
    $('#modelo').val("");
    $('#precio').val("");
    $('#detalles').val("");
    $('#unidades').val("");
    $('#imagen').val("");
}

function buscarProducto(texto) {
    if (texto.trim() === "") {
        listarProductos();
        return;
    }

    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: { search: texto },
        dataType: 'json',
        success: function (productos) {
            let template = "";

            productos.forEach(prod => {
                template += `
                    <tr>
                        <td>${prod.id}</td>
                        <td>${prod.nombre}</td>
                        <td>
                            <ul>
                                <li>precio: $${prod.precio}</li>
                                <li>unidades: ${prod.unidades}</li>
                                <li>modelo: ${prod.modelo}</li>
                                <li>marca: ${prod.marca}</li>
                                <li>detalles: ${prod.detalles}</li>
                            </ul>
                        </td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="cargarProducto(${prod.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${prod.id})">Eliminar</button>
                        </td>
                    </tr>`;
            });

            $('#products').html(template);
        }
    });
}
