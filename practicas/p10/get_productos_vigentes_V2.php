<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<?php
/** SE CREA EL OBJETO DE CONEXION */
@$link = new mysqli('localhost', 'root', 'seguro', 'marketzone');

/** comprobar la conexión */
if ($link->connect_errno) {
    die('Falló la conexión: ' . $link->connect_error . '<br/>');
}

/** Consulta para traer todos los productos que no estén eliminados */
if ($result = $link->query("SELECT * FROM productos WHERE eliminado = 0")) {
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    $result->free();
}

$link->close();
?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Productos Activos</title>
    <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous" />
</head>
<body>
    <h3>Productos disponibles (no eliminados)</h3>
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
                    <td><?= htmlspecialchars($row['nombre']) ?></td>
                    <td><?= htmlspecialchars($row['marca']) ?></td>
                    <td><?= htmlspecialchars($row['modelo']) ?></td>
                    <td>$<?= number_format($row['precio'], 2) ?></td>
                    <td><?= $row['unidades'] ?></td>
                    <td><?= htmlspecialchars(utf8_encode($row['detalles'])) ?></td>
                    <td><img src="<?= $row['imagen'] ?>" width="80" /></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <div class="alert alert-warning" role="alert">
            No hay productos activos para mostrar.
        </div>
    <?php endif; ?>
</body>
</html>
