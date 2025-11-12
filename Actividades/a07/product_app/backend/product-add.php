<?php
use MyAPI\Products;
require_once __DIR__ . "/myapi/Products.php";

$api = new Products("marketzone");
$api->add((object)$_POST);

echo $api->getData();
?>
