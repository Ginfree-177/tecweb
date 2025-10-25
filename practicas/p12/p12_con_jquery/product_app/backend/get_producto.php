<?php
include('database.php');

$q = isset($_GET['q']) ? $_GET['q'] : '';

$sql = "SELECT * FROM productos 
        WHERE eliminado = 0 
        AND (nombre LIKE ? OR descripcion LIKE ?)";
// Cambia $conn por $conexion
$stmt = $conexion->prepare($sql);
$like = "%$q%";
$stmt->bind_param("ss", $like, $like);
$stmt->execute();

$result = $stmt->get_result();
$productos = [];

while ($row = $result->fetch_assoc()) {
  $productos[] = $row;
}

echo json_encode($productos);
?>