<?php
namespace MyAPI;

require_once __DIR__ . "/DataBase.php";

class Products extends DataBase {
    private $data;

    // DB obligatoria, user y pass opcionales
    public function __construct($db = "marketzone", $user = "root", $pass = "seguro") {
        parent::__construct($db, $user, $pass);
        $this->data = [];
    }

    public function search($txt) {
    $sql = "SELECT * FROM productos 
            WHERE (id = '$txt' OR nombre LIKE '%$txt%' OR marca LIKE '%$txt%' OR detalles LIKE '%$txt%')
            AND eliminado = 0";

    $result = $this->conexion->query($sql);

    if ($result) {
        $this->data = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
    }
    }

    // LISTAR productos no eliminados
    public function list() {
        $sql = "SELECT * FROM productos WHERE eliminado = 0";
        $result = $this->conexion->query($sql);

        if ($result) {
            $this->data = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        }
    }

    // BUSCAR producto por nombre
    public function singleByName($name) {
        $sql = "SELECT * FROM productos WHERE nombre = '$name' AND eliminado = 0";
        $result = $this->conexion->query($sql);

        if ($result) {
            $this->data = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        }
    }

    // BUSCAR producto por ID
    public function single($id) {
        $sql = "SELECT * FROM productos WHERE id = $id";
        $result = $this->conexion->query($sql);
        $this->data = $result->fetch_assoc();

        /*if ($result) {
            $this->data = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        }*/
    }

    // AGREGAR producto
    public function add($obj) {
        $sql = "INSERT INTO productos VALUES (
            null,
            '{$obj->nombre}',
            '{$obj->marca}',
            '{$obj->modelo}',
            {$obj->precio},
            '{$obj->detalles}',
            {$obj->unidades},
            '{$obj->imagen}',
            0
        )";

        $this->conexion->query($sql);
        $this->data = [
            "status"  => $this->conexion->affected_rows > 0 ? "success" : "error",
            "message" => $this->conexion->affected_rows > 0 ? "Producto agregado" : $this->conexion->error
        ];
    }

    // EDITAR producto
    public function edit($obj) {
        $sql = "UPDATE productos SET
            nombre='{$obj->nombre}',
            marca='{$obj->marca}',
            modelo='{$obj->modelo}',
            precio={$obj->precio},
            detalles='{$obj->detalles}',
            unidades={$obj->unidades},
            imagen='{$obj->imagen}'
            WHERE id={$obj->id}";

        $this->conexion->query($sql);
        $this->data = [
            "status"  => $this->conexion->affected_rows > 0 ? "success" : "error",
            "message" => $this->conexion->affected_rows > 0 ? "Producto actualizado" : $this->conexion->error
        ];
    }

    // ELIMINAR (lógico)
    public function delete($id) {
        $sql = "UPDATE productos SET eliminado = 1 WHERE id={$id}";
        $this->conexion->query($sql);

        $this->data = [
            "status"  => $this->conexion->affected_rows > 0 ? "success" : "error",
            "message" => $this->conexion->affected_rows > 0 ? "Producto eliminado" : $this->conexion->error
        ];
    }

    // ENTREGAR la respuesta en formato JSON
    public function getData() {
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }
}
