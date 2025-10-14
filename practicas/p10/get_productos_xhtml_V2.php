<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<?php
// Verificamos si llega el parámetro tope
if (isset($_GET['tope']))
    $tope = $_GET['tope'];

if (!empty($tope)) {
    /** SE CREA EL OBJETO DE CONEXION */
    @$link = new mysqli('localhost', 'root', 'seguro', 'marketzone');

    /** comprobar la conexión */
    if ($link->connect_errno) {
        die('Falló la conexión: ' . $link->connect_error . '<br/>');
    }

    /** Consulta para traer todos los productos con unidades <= tope */
    if ($result = $link->query("SELECT * FROM productos WHERE unidades <= $tope AND eliminado = 0")) {
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
    }

    $link->close();
}
?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Productos</title>
    <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous" />
    <script>
        function modificarProducto(event) {
            // Se obtiene el id de la fila
            var rowId = event.target.parentNode.parentNode.id;

            // Se obtienen los datos de la fila (todas las celdas con clase 'row-data')
            var data = document.getElementById(rowId).querySelectorAll(".row-data");

            // Extraer datos (debe coincidir el orden con las columnas)
            var id = data[0].innerHTML;
            var nombre = data[1].innerHTML;
            var marca = data[2].innerHTML;
            var modelo = data[3].innerHTML;
            var precio = data[4].innerHTML;
            var unidades = data[5].innerHTML;
            var detalles = data[6].innerHTML;
            var imagen = data[7].querySelector("img").getAttribute("src");

            // Llama a la función para enviar los datos al formulario
            enviarFormularioModificar(id, nombre, marca, modelo, precio, unidades, detalles, imagen);
        }

        function enviarFormularioModificar(id, nombre, marca, modelo, precio, unidades, detalles, imagen) {
            var form = document.createElement("form");
            form.method = "POST";
            form.action = "http://localhost/tecweb/practicas/p10/formulario_productos_V3.php";

            // Función auxiliar para crear inputs ocultos
            function addInput(name, value) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                input.value = value;
                form.appendChild(input);
            }

            // Agregamos los campos necesarios
            addInput("id", id);
            addInput("nombre", nombre);
            addInput("marca", marca);
            addInput("modelo", modelo);
            addInput("precio", precio);
            addInput("unidades", unidades);
            addInput("detalles", detalles);
            addInput("imagen", imagen);

            document.body.appendChild(form);
            form.submit();
        }
    </script>
</head>
<body>
    <div class="container mt-4">
        <h3>Productos con unidades &lt;= <?= isset($tope) ? htmlspecialchars($tope) : 'N/A' ?></h3>
        <br/>

        <?php if (isset($rows) && count($rows) > 0): ?>
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        <th>Unidades</th>
                        <th>Detalles</th>
                        <th>Imagen</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($rows as $row): ?>
                    <tr id="<?= $row['id'] ?>">
                        <td class="row-data"><?= $row['id'] ?></td>
                        <td class="row-data"><?= htmlspecialchars($row['nombre']) ?></td>
                        <td class="row-data"><?= htmlspecialchars($row['marca']) ?></td>
                        <td class="row-data"><?= htmlspecialchars($row['modelo']) ?></td>
                        <td class="row-data"><?= htmlspecialchars($row['precio']) ?></td>
                        <td class="row-data"><?= htmlspecialchars($row['unidades']) ?></td>
                        <td class="row-data"><?= htmlspecialchars(utf8_encode($row['detalles'])) ?></td>
                        <td class="row-data"><img src="<?= htmlspecialchars($row['imagen']) ?>" width="80" /></td>
                        <td>
                            <input type="button" class="btn btn-primary btn-sm"
                                value="Modificar"
                                onclick="modificarProducto(event)" />
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php elseif (!empty($tope)): ?>
            <script>alert('No hay productos con ese tope de unidades');</script>
        <?php endif; ?>
    </div>
</body>
</html>
