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
                                <button class="product-delete btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $('#products').html(template);

                // Delegar el evento click a los botones eliminar
                $('#products').find('.product-delete').off('click').on('click', function() {
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
    // Evita ejecutar la búsqueda si no hay texto
    if (search.trim().length === 0) {
        listarProductos(); // si está vacío, vuelve a mostrar todos
        return;
    }

    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: { search: search }, // se envía el valor del input como parámetro GET
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
                                <button class="product-delete btn btn-danger" onclick="eliminarProducto(${producto.id})">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;

                    template_bar += `<li>${producto.nombre}</li>`;
                });

                // Mostrar barra de resultados
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