// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
  };

// FUNCIÓN CALLBACK DE BOTÓN "Buscar"
function buscarID(e) {
    /**
     * Revisar la siguiente información para entender porqué usar event.preventDefault();
     * http://qbit.com.mx/blog/2013/01/07/la-diferencia-entre-return-false-preventdefault-y-stoppropagation-en-jquery/#:~:text=PreventDefault()%20se%20utiliza%20para,escuche%20a%20trav%C3%A9s%20del%20DOM
     * https://www.geeksforgeeks.org/when-to-use-preventdefault-vs-return-false-in-javascript/
     */
    e.preventDefault();

    // SE OBTIENE EL ID A BUSCAR
    var id = document.getElementById('search').value;

    // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
    var client = getXMLHttpRequest();
    client.open('POST', './backend/read.php', true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.onreadystatechange = function () {
        // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
        if (client.readyState == 4 && client.status == 200) {
            console.log('[CLIENTE]\n'+client.responseText);
            
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let productos = JSON.parse(client.responseText);    // similar a eval('('+client.responseText+')');
            
            // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
            if(Object.keys(productos).length > 0) {
                // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                let descripcion = '';
                    descripcion += '<li>precio: '+productos.precio+'</li>';
                    descripcion += '<li>unidades: '+productos.unidades+'</li>';
                    descripcion += '<li>modelo: '+productos.modelo+'</li>';
                    descripcion += '<li>marca: '+productos.marca+'</li>';
                    descripcion += '<li>detalles: '+productos.detalles+'</li>';
                
                // SE CREA UNA PLANTILLA PARA CREAR LA(S) FILA(S) A INSERTAR EN EL DOCUMENTO HTML
                let template = '';
                    template += `
                        <tr>
                            <td>${productos.id}</td>
                            <td>${productos.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                        </tr>
                    `;

                // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                document.getElementById("productos").innerHTML = template;
            }
        }
    };
    client.send("id="+id);
}

//Funcion buscar producto
function buscarProducto(e) {
    e.preventDefault();

    // SE OBTIENE EL TEXTO A BUSCAR
    var texto = document.getElementById('nombre').value.trim();

    if (texto === '') {
        var texto = document.getElementById('marca').value.trim();
        if(texto === '')
        {
            var texto = document.getElementById('detalles').value.trim();
            if(texto == '')
            {
                alert('Por favor, ingrese parte del nombre, marca o detalles.');
                return;
            }
        }
    }

    // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA
    var client = getXMLHttpRequest();
    client.open('POST', './backend/read.php', true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200) {
            console.log('[CLIENTE]\n' + client.responseText);

            let productos = JSON.parse(client.responseText);

            // Si el servidor devuelve un arreglo vacío
            if (productos.length === 0) {
                alert('No se encontraron productos que coincidan.');
                return;
            }

            // Construimos la tabla
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
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td><ul>${descripcion}</ul></td>
                    </tr>
                `;
            });

            document.getElementById("productos").innerHTML = template;
        }
    };

    // ENVÍA EL PARÁMETRO DE BÚSQUEDA
    client.send("texto=" + encodeURIComponent(texto));
}


// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
function agregarProducto(e) {
    e.preventDefault();

    var productoJsonString = document.getElementById('description').value;
    let finalJSON;

    try {
        finalJSON = JSON.parse(productoJsonString);
    } catch (error) {
        alert("El JSON no tiene un formato válido.");
        return;
    }

    finalJSON['nombre'] = document.getElementById('name').value.trim();
    productoJsonString = JSON.stringify(finalJSON, null, 2);

    // --- VALIDACIONES ---
    if (finalJSON.nombre.length === 0) {
        alert("El nombre del producto es obligatorio");
        return;
    }

    if (finalJSON.nombre.length > 100) {
        alert("El nombre del producto debe tener menos de 100 caracteres");
        return;
    }

    if (!finalJSON.marca || finalJSON.marca.length === 0) {
        alert("La marca es un campo obligatorio");
        return;
    }

    if (!finalJSON.modelo || finalJSON.modelo.length === 0) {
        alert("El modelo es un campo obligatorio");
        return;
    }

    if (finalJSON.modelo.length > 25) {
        alert("El modelo debe tener menos de 25 caracteres");
        return;
    }

    if (!/^[A-Za-z0-9\- ]+$/.test(finalJSON.modelo)) {
        alert("El campo Modelo solo puede contener letras, números, espacios o guiones");
        return;
    }

    if (finalJSON.precio === "" || isNaN(finalJSON.precio)) {
        alert("El precio es un campo obligatorio y debe ser un número");
        return;
    }

    if (finalJSON.precio < 99.99) {
        alert("El precio debe ser mayor o igual a 99.99");
        return;
    }

    if (finalJSON.detalles && finalJSON.detalles.length > 250) {
        alert("Los detalles no pueden tener más de 250 caracteres");
        return;
    }

    if (finalJSON.unidades === "" || isNaN(finalJSON.unidades)) {
        alert("Las unidades deben ser un número");
        return;
    }

    if (finalJSON.unidades < 0) {
        alert("El número de unidades debe ser mayor o igual a 0");
        return;
    }

    if (!finalJSON.imagen || finalJSON.imagen.trim() === "") {
        finalJSON.imagen = "img/default.png";
    }

    // --- ENVÍO AL SERVIDOR ---
    var client = getXMLHttpRequest();
    client.open('POST', './backend/create.php', true);
    client.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            console.log(client.responseText);
            alert(client.responseText);
            //alert("Producto agregado correctamente.");
            document.getElementById('task-form').reset();
        }
    };
    client.send(JSON.stringify(finalJSON, null, 2));
}

// SE CREA EL OBJETO DE CONEXIÓN COMPATIBLE CON EL NAVEGADOR
function getXMLHttpRequest() {
    var objetoAjax;

    try{
        objetoAjax = new XMLHttpRequest();
    }catch(err1){
        /**
         * NOTA: Las siguientes formas de crear el objeto ya son obsoletas
         *       pero se comparten por motivos historico-académicos.
         */
        try{
            // IE7 y IE8
            objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err2){
            try{
                // IE5 y IE6
                objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(err3){
                objetoAjax = false;
            }
        }
    }
    return objetoAjax;
}

function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     * ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
     */
    var JsonString = JSON.stringify(baseJSON,null,2);
    document.getElementById("description").value = JsonString;
}