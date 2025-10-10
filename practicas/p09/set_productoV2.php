<?php
// --- Validar parámetros obligatorios ---
$campos = ['nombre', 'marca', 'modelo', 'precio', 'detalles', 'unidades', 'imagen'];
foreach ($campos as $campo) {
    if (!isset($_POST[$campo]) || $_POST[$campo] === '') {
        die("<h3>Error: Falta el parámetro '$campo'.</h3>");
    }
}

// --- Asignar variables ---
$nombre   = $_POST['nombre'];
$marca    = $_POST['marca'];
$modelo   = $_POST['modelo'];
$precio   = $_POST['precio'];
$detalles = $_POST['detalles'];
$unidades = $_POST['unidades'];
$imagen   = $_POST['imagen'];

// --- Conectar a la base de datos ---
@$link = new mysqli('localhost', 'root', 'seguro', 'marketzone');

if ($link->connect_errno) {
    die("<h3>Falló la conexión a MySQL: " . $link->connect_error . "</h3>");
}

// --- Verificar si el producto ya existe (nombre + marca + modelo) ---
$nombre = $link->real_escape_string($nombre);
$marca = $link->real_escape_string($marca);
$modelo = $link->real_escape_string($modelo);

$sql_check = "SELECT COUNT(*) AS total FROM productos 
              WHERE nombre = '$nombre' AND marca = '$marca' AND modelo = '$modelo'";

$result = $link->query($sql_check);
$row = $result->fetch_assoc();

if ($row['total'] > 0) {
    // Ya existe un producto con esos datos
    echo "<h3>❌ El producto con nombre <strong>$nombre</strong>, marca <strong>$marca</strong> y modelo <strong>$modelo</strong> ya existe.</h3>";
    echo "<p>Verifique los datos e intente nuevamente.</p>";
} else {
    // --- Insertar el nuevo producto ---
    $detalles = $link->real_escape_string($detalles);
    $imagen   = $link->real_escape_string($imagen);

    $sql_insert = "INSERT INTO productos 
        (id, nombre, marca, modelo, precio, detalles, unidades, imagen)
        VALUES (NULL, '$nombre', '$marca', '$modelo', $precio, '$detalles', $unidades, '$imagen')";

    if ($link->query($sql_insert)) {
        echo "<h3>✅ Producto insertado correctamente.</h3>";
        echo "<p><strong>ID generado:</strong> " . $link->insert_id . "</p>";
        echo "<ul>
                <li><strong>Nombre:</strong> $nombre</li>
                <li><strong>Marca:</strong> $marca</li>
                <li><strong>Modelo:</strong> $modelo</li>
                <li><strong>Precio:</strong> $precio</li>
                <li><strong>Detalles:</strong> $detalles</li>
                <li><strong>Unidades:</strong> $unidades</li>
                <li><strong>Imagen:</strong> $imagen</li>
              </ul>";
    } else {
        echo "<h3>❌ Error al insertar el producto.</h3>";
        echo "<p>MySQL dice: " . $link->error . "</p>";
    }
}

$link->close();
?>
