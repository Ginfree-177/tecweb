<?php
    $conexion = @mysqli_connect(
        'localhost',
        'root',
        'seguro',
        'marketzone'
    );

    /**
     * NOTA: si la conexión falló $conexion contendrá false
     **/
    if(!$conexion) {
        die('¡Base de datos NO conectada!');
    }
?>