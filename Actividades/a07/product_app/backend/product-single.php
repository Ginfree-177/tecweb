<?php
use MyAPI\Products;
require_once __DIR__ . "/myapi/Products.php";

$api = new Products("marketzone");
$api->single($_POST['id']);

echo $api->getData();
?>