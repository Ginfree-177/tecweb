<?php
@$link = new mysqli('localhost', 'root', 'seguro', 'marketzone');

if ($link->connect_errno) {
    die(json_encode(['error' => 'Error de conexión']));
}

$id = intval($_GET['id']);

$result = $link->query("SELECT * FROM productos WHERE id = $id AND eliminado = 0");
if ($result && $result->num_rows > 0) {
    $producto = $result->fetch_assoc();
    echo json_encode($producto);
} else {
    echo json_encode(['error' => 'No encontrado']);
}

$link->close();
?>
