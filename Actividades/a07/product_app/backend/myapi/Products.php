<?php
include_once __DIR__.'/DataBase.php';
class Products extends DataBase{
    private $data;

    public function Products($db, $user, $pass)
    {
        DataBase($db, $user, $pass);
    }
}
?>