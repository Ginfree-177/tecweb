<?php
    require_once __DIR__ . '/../vendor/autoload.php';

    use TECWEB\MYAPI\Read;

    $api = new Read('marketzone');
    $api->search( $_GET['search'] );
    echo $api->getData();
?>