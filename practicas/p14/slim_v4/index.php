<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

//use Nyholm\Psr7\Response;
require 'vendor/autoload.php';

//$app = new Slim\App();

$app = AppFactory::create();
// /myapp/api is the api folder http://domain/myapp/api/
//$app->setBasePath("/myapp/api");
$app->setBasepath("/tecweb/practicas/p14/slim_v4");

$app->get('/', function ($request, $response, $args){
    $response->getBody()->write("Hola Mundo Slim!!!");
    return $response;
});

$app->get("/hola/{nombre}", function($request, $response, $args){
    $response->getBody()->write("Hola," . $args["nombre"]);
    return $response;
});

$app->post("/pruebapost", function($request, $response, $args){
    $reqPost = $request->getParsedBody();
    $val1 = $reqPost["val1"];
    $val2 = $reqPost["val2"];

    $response->getBody()->write("Valores:".$val1." ".$val2);
    return $response;
});

$app->get("/testjson", function($request, $response, $args){
    $data[0]["nombre"]="Sergio";
    $data[0]["apellidos"]="Rojas Espino";
    $data[1]["nombre"]="Pedro";
    $data[1]["apellidos"]="Perez Lopez";
    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response;
});

$app->run();
?>