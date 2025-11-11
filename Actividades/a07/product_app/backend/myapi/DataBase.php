<?php 
class DataBase{
        private $conexion;

        public function DataBase($db, $user, $pass)
        {
            $conexion = @mysqli_connect(
        'localhost',
        '$user',
        '$pass',
        '$db'
        );
        }
    }
?>