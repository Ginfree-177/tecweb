<?php
@$link = new mysqli('localhost', 'root', 'seguro', 'marketzone');

if ($link->connect_errno) {
    die("Error de conexión: " . $link->connect_error);
}

$id = intval($_POST['id']);
$nombre = $link->real_escape_string($_POST['nombre']);
$marca = $link->real_escape_string($_POST['marca']);
$modelo = $link->real_escape_string($_POST['modelo']);
$precio = floatval($_POST['precio']);
$detalles = $link->real_escape_string($_POST['detalles']);
$unidades = intval($_POST['unidades']);
$imagen = $link->real_escape_string($_POST['imagen']);

$sql = "UPDATE productos SET 
            nombre='$nombre',
            marca='$marca',
            modelo='$modelo',
            precio=$precio,
            detalles='$detalles',
            unidades=$unidades,
            imagen='$imagen'
        WHERE id=$id";

if ($link->query($sql)) {
    echo "<script>alert('Producto actualizado correctamente'); window.location.href='productos_activos.php';</script>";
} else {
    echo "<script>alert('Error al actualizar: " . $link->error . "'); history.back();</script>";
}

$link->close();
?>
