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
    if ($result = $link->query("SELECT * FROM productos WHERE unidades <= $tope")) {
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
    }

    $link->close();
}
?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Productos con pocas unidades</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous" />
</head>
<body>
    <h3>PRODUCTOS CON UNIDADES &lt;= <?= isset($tope) ? $tope : 'N/A' ?></h3>
    <br/>

    <?php if (isset($rows) && count($rows) > 0): ?>
        <table class="table table-striped">
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
                </tr>
            </thead>
            <tbody>
                <?php foreach ($rows as $row): ?>
                <tr>
                    <th scope="row"><?= $row['id'] ?></th>
                    <td><?= $row['nombre'] ?></td>
                    <td><?= $row['marca'] ?></td>
                    <td><?= $row['modelo'] ?></td>
                    <td><?= $row['precio'] ?></td>
                    <td><?= $row['unidades'] ?></td>
                    <td><?= utf8_encode($row['detalles']) ?></td>
                    <td><img src="<?= $row['imagen'] ?>" width="80" /></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php elseif (!empty($tope)): ?>
        <script>alert('No hay productos con ese tope de unidades');</script>
    <?php endif; ?>
</body>
</html>
