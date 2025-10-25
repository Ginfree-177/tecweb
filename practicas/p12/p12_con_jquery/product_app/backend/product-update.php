<?php
include_once __DIR__.'/database.php';

$data = array(
    'status' => 'error',
    'message' => 'La actualización falló'
);

$input = file_get_contents('php://input');
if(!empty($input)) {
    $jsonOBJ = json_decode($input);

    if(isset($jsonOBJ->id)) {
        $id = intval($jsonOBJ->id);
        $nombre = $jsonOBJ->nombre ?? '';
        $marca = $jsonOBJ->marca ?? '';
        $modelo = $jsonOBJ->modelo ?? '';
        $precio = floatval($jsonOBJ->precio ?? 0);
        $detalles = $jsonOBJ->detalles ?? '';
        $unidades = intval($jsonOBJ->unidades ?? 1);
        $imagen = $jsonOBJ->imagen ?? 'img/default.png';

        // PRIMERO VERIFICAR SI EL NOMBRE YA EXISTE EN OTRO PRODUCTO
        $sql_check = "SELECT id FROM productos WHERE nombre = ? AND id != ? AND eliminado = 0";
        $stmt_check = $conexion->prepare($sql_check);
        $stmt_check->bind_param("si", $nombre, $id);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();
        
        if($result_check->num_rows > 0) {
            $data['message'] = 'Ya existe otro producto con ese nombre';
            $stmt_check->close();
        } else {
            $stmt_check->close();
            
            // ACTUALIZAR EL PRODUCTO
            $sql = "UPDATE productos SET 
                    nombre=?, marca=?, modelo=?, precio=?, 
                    detalles=?, unidades=?, imagen=? 
                    WHERE id=?";
            
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("sssdsisi", $nombre, $marca, $modelo, $precio, 
                             $detalles, $unidades, $imagen, $id);
            
            if($stmt->execute()) {
                $data['status'] = 'success';
                $data['message'] = 'Producto actualizado correctamente';
            } else {
                $data['message'] = "ERROR: " . $stmt->error;
            }
            $stmt->close();
        }
        $conexion->close();
    }
}

echo json_encode($data, JSON_PRETTY_PRINT);
?>