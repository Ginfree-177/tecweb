<?php
include_once __DIR__.'/database.php';

$data = array(
    'status' => 'error',
    'message' => 'No se pudo obtener el producto',
    'data' => null
);

if(isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    $sql = "SELECT * FROM productos WHERE id = ? AND eliminado = 0";
    
    if($stmt = $conexion->prepare($sql)) {
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if($result->num_rows > 0) {
            $producto = $result->fetch_assoc();
            
            // Codificar a UTF-8
            foreach($producto as $key => $value) {
                $producto[$key] = utf8_encode($value);
            }
            
            $data['status'] = 'success';
            $data['message'] = 'Producto encontrado';
            $data['data'] = $producto;
        } else {
            $data['message'] = 'Producto no encontrado';
        }
        
        $stmt->close();
    }
    
    $conexion->close();
}

echo json_encode($data, JSON_PRETTY_PRINT);
?>