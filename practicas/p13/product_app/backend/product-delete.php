<?php
    use TECWEB\MYAPI\Delete;
    require_once __DIR__ . '/../vendor/autoload.php';

    $api = new Delete('marketzone');
    $api->delete( $_POST['id'] );
    echo $api->getData();
?>