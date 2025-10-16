<?php
include_once __DIR__.'/database.php';

$data = array();

if (isset($_POST['id'])) {
    // Búsqueda por ID exacto
    $id = $_POST['id'];
    $sql = "SELECT * FROM productos WHERE id = '$id'";
} elseif (isset($_POST['texto'])) {
    // Búsqueda general (nombre, marca o detalles)
    $texto = $conexion->real_escape_string($_POST['texto']);
    $sql = "SELECT * FROM productos 
            WHERE nombre LIKE '%$texto%' 
               OR marca LIKE '%$texto%' 
               OR detalles LIKE '%$texto%'";
} else {
    echo json_encode([]); // Si no hay parámetro
    exit;
}

// Ejecutar la consulta
if ($result = $conexion->query($sql)) {
    while ($row = $result->fetch_assoc()) {
        // Codificar a UTF-8
        foreach ($row as $key => $value) {
            $row[$key] = utf8_encode($value);
        }
        $data[] = $row;
    }
    $result->free();
} else {
    die('Query Error: '.mysqli_error($conexion));
}

$conexion->close();

// Retornar como JSON
echo json_encode($data, JSON_PRETTY_PRINT);
?>
