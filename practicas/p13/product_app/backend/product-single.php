<?php
    require_once __DIR__ . '/../vendor/autoload.php';

    use TECWEB\MYAPI\Read;

    $api = new read('marketzone');
    $api->single( $_POST['id'] );
    echo $api->getData();
?>