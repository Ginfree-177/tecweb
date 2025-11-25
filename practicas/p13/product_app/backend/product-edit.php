<?php
    use TECWEB\MYAPI\Update;
    require_once __DIR__ . '/../vendor/autoload.php';

    $api = new Update('marketzone');
    $api->edit( json_decode( json_encode($_POST) ) );
    echo $api->getData();
?>