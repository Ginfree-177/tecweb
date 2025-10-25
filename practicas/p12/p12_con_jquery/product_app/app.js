// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
  };

function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     * ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
     */
    var JsonString = JSON.stringify(baseJSON,null,2);
    document.getElementById("description").value = JsonString;

    // SE LISTAN TODOS LOS PRODUCTOS
    listarProductos();

    $(document).ready(function () {
    // Al cargar, muestra todos los productos
    listarProductos();

    // Cada vez que se escribe algo en el input de búsqueda
    $('#search').on('keyup', function () {
        let valor = $(this).val();
        buscarProducto(valor);
    });

    $('#product-form').on('submit', function(e){
        e.preventDefault();
        let id = $('#productId').val();
        if(id) {
            actualizarProducto(id);  // Si hay ID, es actualización
        } else {
            agregarProducto(e);      // Si no hay ID, es nuevo producto
        }
    });
    });
    document.getElementById("product-form").addEventListener("submit", agregarProducto);
}

function listarProductos() {
    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        dataType: 'json',
        success: function (productos) {
            if (productos && productos.length > 0) {
                let template = '';

                productos.forEach(producto => {
                    let descripcion = `
                        <li>precio: ${producto.precio}</li>
                        <li>unidades: ${producto.unidades}</li>
                        <li>modelo: ${producto.modelo}</li>
                        <li>marca: ${producto.marca}</li>
                        <li>detalles: ${producto.detalles}</li>
                    `;

                    template += `
                        <tr productId="${producto.id}">
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                            <td>
                                <button class="product-edit btn btn-warning mr-1">Editar</button>
                                <button class="product-delete btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $('#products').html(template);

                // Delegar eventos a los botones (importante para elementos dinámicos)
                $('#products').on('click', '.product-edit', function() {
                    let id = $(this).closest('tr').attr('productId');
                    editarProducto(id);
                });

                $('#products').on('click', '.product-delete', function() {
                    let id = $(this).closest('tr').attr('productId');
                    eliminarProducto(id);
                });

            } else {
                $('#products').html('<tr><td colspan="4">No hay productos disponibles</td></tr>');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener productos:', error);
            alert('Ocurrió un error al cargar los productos.');
        }
    });
}

function buscarProducto(search) {
    if (search.trim().length === 0) {
        listarProductos();
        return;
    }

    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: { search: search },
        dataType: 'json',
        success: function (productos) {
            if (productos && productos.length > 0) {
                let template = '';
                let template_bar = '';

                productos.forEach(producto => {
                    let descripcion = `
                        <li>precio: ${producto.precio}</li>
                        <li>unidades: ${producto.unidades}</li>
                        <li>modelo: ${producto.modelo}</li>
                        <li>marca: ${producto.marca}</li>
                        <li>detalles: ${producto.detalles}</li>
                    `;

                    template += `
                        <tr productId="${producto.id}">
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                            <td>
                                <button class="product-edit btn btn-warning mr-1">Editar</button>
                                <button class="product-delete btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;

                    template_bar += `<li>${producto.nombre}</li>`;
                });

                $('#product-result').removeClass('d-none').addClass('card my-4 d-block');
                $('#container').html(template_bar);
                $('#products').html(template);
            } else {
                $('#product-result').removeClass('d-none').addClass('card my-4 d-block');
                $('#container').html('<li>No se encontraron productos</li>');
                $('#products').html('');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la búsqueda:', error);
        }
    });
}

//punto 2
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");

  // Evento: cada vez que el usuario escribe
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();

    if (query.length === 0) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    // Petición AJAX con jQuery
    $.ajax({
      url: "get_producto.php",
      method: "GET",
      data: { q: query },
      dataType: "json",
      success: function (response) {
        suggestions.innerHTML = "";

        const productos = response.filter(p => p.eliminado != 1);

        if (productos.length === 0) {
          suggestions.innerHTML = `
            <a class="list-group-item list-group-item-action disabled text-muted">Sin coincidencias</a>`;
          suggestions.style.display = "block";
          return;
        }

        // Crear una opción por cada producto
        productos.forEach(prod => {
          const item = document.createElement("a");
          item.className = "list-group-item list-group-item-action";
          item.textContent = prod.nombre;
          
          // Si haces clic en una sugerencia, la coloca en el campo
          item.addEventListener("click", () => {
            searchInput.value = prod.nombre;
            suggestions.innerHTML = "";
            suggestions.style.display = "none";
          });

          suggestions.appendChild(item);
        });

        suggestions.style.display = "block";
      },
      error: function () {
        console.error("Error al obtener sugerencias");
      }
    });
  });

  // Ocultar sugerencias al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!suggestions.contains(e.target) && e.target !== searchInput) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
    }
  });
});

function agregarProducto(e) {
    e.preventDefault();

    // OBTENER JSON desde el textarea del formulario
    var productoJsonString = document.getElementById('description').value;

    try {
        // Convertir a objeto
        var finalJSON = JSON.parse(productoJsonString);
    } catch (error) {
        alert("El formato del JSON es inválido");
        return;
    }

    // Agregar el nombre del producto desde el input
    finalJSON['nombre'] = document.getElementById('name').value;

    // Validaciones básicas antes de enviar
    if (!finalJSON['nombre'] || finalJSON['nombre'].trim() === "") {
        alert("El nombre del producto es requerido.");
        return;
    }

    if (finalJSON['nombre'].length > 100) {
        alert("El nombre del producto no puede tener más de 100 caracteres.");
        return;
    }

    // Enviar los datos con jQuery (AJAX)
    $.ajax({
        url: './backend/product-add.php',
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(finalJSON),
        dataType: 'json',

        success: function (respuesta) {
            console.log(respuesta);

            // Mostrar el estatus y mensaje en la interfaz
            let template_bar = `
                <li style="list-style: none;">status: ${respuesta.status}</li>
                <li style="list-style: none;">message: ${respuesta.message}</li>
            `;

            $("#product-result")
                .removeClass("d-none")
                .addClass("card my-4 d-block");
            $("#container").html(template_bar);

            // Mostrar alerta con el mensaje (como pide la práctica)
            window.alert(respuesta.message);

            // Recargar lista si la inserción fue exitosa
            if (respuesta.status === "success") {
                listarProductos();
            }
        },

        error: function (xhr, status, error) {
            console.error("Error en la inserción:", error);
            window.alert("Ocurrió un error al registrar el producto.");
        }
    });
}

function eliminarProducto(id) {
    if (confirm("¿De verdad deseas eliminar el producto?")) {
        $.ajax({
            url: './backend/product-delete.php',
            type: 'GET',
            data: { id: id },
            dataType: 'json',
            success: function (respuesta) {
                console.log(respuesta);

                let template_bar = `
                    <li style="list-style: none;">status: ${respuesta.status}</li>
                    <li style="list-style: none;">message: ${respuesta.message}</li>
                `;

                $("#product-result").removeClass("d-none").addClass("card my-4 d-block");
                $("#container").html(template_bar);

                // Recargar lista de productos no eliminados
                listarProductos();
            },
            error: function (xhr, status, error) {
                console.error("Error en la eliminación:", error);
                alert("Ocurrió un error al intentar eliminar el producto.");
            }
        });
    }
}

function editarProducto(id) {
    $.ajax({
        url: './backend/product-get.php',
        type: 'GET',
        data: { id: id },
        dataType: 'json',
        success: function(respuesta) {
            if(respuesta.status === 'success') {
                let producto = respuesta.data;
                
                // Rellenar el formulario con los datos del producto
                $('#productId').val(producto.id);
                $('#name').val(producto.nombre);
                
                // Crear objeto JSON con los detalles
                let jsonObj = {
                    precio: producto.precio,
                    unidades: producto.unidades,
                    modelo: producto.modelo,
                    marca: producto.marca,
                    detalles: producto.detalles,
                    imagen: producto.imagen
                };
                
                $('#description').val(JSON.stringify(jsonObj, null, 2));
                
                // Cambiar el texto del botón
                $('#product-form button[type="submit"]').text('Actualizar Producto');
            } else {
                alert('Error al cargar el producto');
            }
        },
        error: function() {
            alert('Error al cargar los datos del producto');
        }
    });
}

// Función para actualizar el producto
function actualizarProducto(id) {
    let productoJsonString = $('#description').val();
    let finalJSON;

    try {
        finalJSON = JSON.parse(productoJsonString);
    } catch (err) {
        alert("JSON inválido");
        return;
    }

    // Obtener valores del formulario
    const nombre = $('#name').val().trim();
    const marca = finalJSON.marca ? finalJSON.marca.trim() : '';
    const modelo = finalJSON.modelo ? finalJSON.modelo.trim() : '';
    const precio = parseFloat(finalJSON.precio);
    const detalles = finalJSON.detalles ? finalJSON.detalles.trim() : '';
    const unidades = parseInt(finalJSON.unidades);

    // a. Validar nombre - requerido y máximo 100 caracteres
    if (!nombre) {
        alert("El nombre del producto es requerido.");
        return;
    }
    if (nombre.length > 100) {
        alert("El nombre del producto no puede tener más de 100 caracteres.");
        return;
    }

    // b. Validar marca - requerida
    if (!marca) {
        alert("La marca del producto es requerida.");
        return;
    }

    // c. Validar modelo - requerido, alfanumérico y máximo 25 caracteres
    if (!modelo) {
        alert("El modelo del producto es requerido.");
        return;
    }
    
    // Validar que sea alfanumérico (letras, números, guiones)
    const modeloRegex = /^[a-zA-Z0-9\-_ ]+$/;
    if (!modeloRegex.test(modelo)) {
        alert("El modelo solo puede contener letras, números, guiones y espacios.");
        return;
    }
    
    if (modelo.length > 25) {
        alert("El modelo no puede tener más de 25 caracteres.");
        return;
    }

    // d. Validar precio - requerido y mayor a 99.99
    if (isNaN(precio)) {
        alert("El precio es requerido y debe ser un número válido.");
        return;
    }
    if (precio <= 99.99) {
        alert("El precio debe ser mayor a 99.99");
        return;
    }

    // e. Validar detalles - opcional pero máximo 250 caracteres
    if (detalles.length > 250) {
        alert("Los detalles no pueden tener más de 250 caracteres.");
        return;
    }

    // f. Validar unidades - requeridas y mayor o igual a 0
    if (isNaN(unidades)) {
        alert("Las unidades son requeridas y deben ser un número válido.");
        return;
    }
    if (unidades < 0) {
        alert("Las unidades deben ser mayor o igual a 0.");
        return;
    }

    // Actualizar el objeto finalJSON con los valores validados
    finalJSON['nombre'] = nombre;
    finalJSON['marca'] = marca;
    finalJSON['modelo'] = modelo;
    finalJSON['precio'] = precio;
    finalJSON['detalles'] = detalles;
    finalJSON['unidades'] = unidades;
    finalJSON['id'] = id;

    // Mostrar datos que se enviarán (para depuración)
    console.log('Datos validados a enviar:', finalJSON);

    $.ajax({
        url: './backend/product-update.php',
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(finalJSON),
        dataType: 'json',
        success: function(respuesta) {
            alert(respuesta.message);

            // Mostrar barra de estado
            let template_bar = `
                <li style="list-style: none;">status: ${respuesta.status}</li>
                <li style="list-style: none;">message: ${respuesta.message}</li>
            `;
            $("#product-result").removeClass("d-none").addClass("card my-4 d-block");
            $("#container").html(template_bar);

            if(respuesta.status === "success") {
                // Recargar la lista de productos
                listarProductos();
                // Resetear el formulario
                resetForm();
            }
        },
        error: function(err) {
            console.error(err);
            alert("Ocurrió un error al actualizar el producto");
        }
    });
}

// Función para resetear el formulario
function resetForm() {
    $('#productId').val('');
    $('#name').val('');
    $('#description').val(JSON.stringify(baseJSON, null, 2));
    $('#product-form button[type="submit"]').text('Agregar Producto');
}
