<?php
    require_once __DIR__ . '/../vendor/autoload.php';

    use TECWEB\MYAPI\Read;

    $api = new Read('marketzone');
    $api->list();
    echo $api->getData();
?>