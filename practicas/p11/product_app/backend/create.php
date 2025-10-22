<?php
include_once __DIR__ . '/database.php';

// SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
$producto = file_get_contents('php://input');

if (!empty($producto)) {
    // SE TRANSFORMA EL STRING DEL JSON A OBJETO
    $jsonOBJ = json_decode($producto);

    // LIMPIAR DATOS PARA EVITAR ERRORES DE SINTAXIS SQL
    $nombre = $conexion->real_escape_string($jsonOBJ->nombre);
    $marca = $conexion->real_escape_string($jsonOBJ->marca);
    $modelo = $conexion->real_escape_string($jsonOBJ->modelo);
    $detalles = $conexion->real_escape_string($jsonOBJ->detalles);
    $imagen = $conexion->real_escape_string($jsonOBJ->imagen);

    $precio = (float)$jsonOBJ->precio;
    $unidades = (int)$jsonOBJ->unidades;

    // VALIDAR SI YA EXISTE UN PRODUCTO CON EL MISMO NOMBRE Y NO ELIMINADO
    $sql = "SELECT * FROM productos WHERE nombre = '$nombre' AND eliminado = 0";
    $resultado = $conexion->query($sql);

    if ($resultado && $resultado->num_rows > 0) {
        echo "Ya existe un producto registrado con el mismo nombre.";
    } else {
        // SI NO EXISTE, SE INSERTA EL NUEVO PRODUCTO
        $sql_insert = "INSERT INTO productos 
            (nombre, marca, modelo, precio, detalles, unidades, imagen, eliminado)
            VALUES ('$nombre', '$marca', '$modelo', $precio, '$detalles', $unidades, '$imagen', 0)";

        if ($conexion->query($sql_insert)) {
            echo "Producto agregado correctamente.";
        } else {
            echo "Error al insertar el producto: " . $conexion->error;
        }
    }

    $conexion->close();
} else {
    echo "No se recibieron datos.";
}
?>
