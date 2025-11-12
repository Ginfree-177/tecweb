<?php
namespace MyAPI;

abstract class DataBase {
    protected $conexion;

    public function __construct($db, $user, $pass) {
        $this->conexion = @mysqli_connect(
            "localhost",
            $user,
            $pass,
            $db
        );

        if(!$this->conexion) {
            die("Error de conexión a la BD: " . mysqli_connect_error());
        }
    }
}
