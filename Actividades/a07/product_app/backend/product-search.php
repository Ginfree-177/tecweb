<?php
use MyAPI\Products;
require_once __DIR__ . "/myapi/Products.php";

$api = new Products("marketzone");
$api->search($_GET['search']);

echo $api->getData();
?>