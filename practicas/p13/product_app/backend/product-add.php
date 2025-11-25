<?php
    use TECWEB\MYAPI\Create;
    require_once __DIR__ . '/../vendor/autoload.php';

    $api = new Create('marketzone');
    $api->add( json_decode( json_encode($_POST) ) );
    echo $api->getData();
?>