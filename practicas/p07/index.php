<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica 7</title>
</head>
<body>
    <h2>Ejercicio 1</h2> <!-- Ejercicio 1 -->

    <!-- Formulario -->
    <form action="index.php" method="get">
        <label for="numero">Introduce un número:</label>
        <input type="number" name="numero" id="numero" required>
        <input type="submit" value="Calcular">
    </form>

    <br>
    <?php
    // Incluimos las funciones
    include("src/funciones.php");

    // Verificamos si el usuario envió un número
    if (isset($_GET['numero'])) {
        $num = $_GET['numero'];
        echo "<h3>R= " . EsMultiplo5y7($num) . "</h3>";
    }
    ?>
    
    <h2>Ejercicio 2</h2> <!-- Ejercicio 2 -->
    <?php
    if (isset($_GET['numero'])) {
        MatrizMx3();
       }  
    ?>

    <h2>Ejercicio 3</h2> <!-- Ejercicio 3 -->
    <p>Inciso 1</p>
    <?php
      if (isset($_GET['numero'])) {
        EnteroConWhile($_GET['numero']);
       }
    ?> 
    <p>Inciso 2</p>
    <?php
      if (isset($_GET['numero'])) {
        EnteroConDoWhile($_GET['numero']);
       }
    ?>
    <h2>Ejercicio 4</h2> <!-- Ejercicio 4 -->
    <p>Tabla del codigo ASCII impresa con foreach</p>
    <?php
      if (isset($_GET['numero'])) {
        Abcedario();
       }
    ?> 

    <h2>Ejercicio 5</h2> <!-- Ejercicio 5 -->

    <!-- Formulario -->
    <form action="./src/funciones.php" method="post">
        <li>Sexo: <input type="text" name="sexo"></li>
        <br>
        <li>Edad: <input type="number" name="edad" id="edad"></li>
        <br>
        <input type="submit" value="Enviar">
    </form>

    <h2>Ejercicio 6</h2> <!-- Ejercicio 6 -->
    <p>Parque Vehicular</p>

    <!-- Formulario para buscar por matrícula -->
    <form action="index.php" method="post">
        <label for="matricula">Buscar por matrícula:</label>
        <input type="text" name="matricula" id="matricula" placeholder="Ej: ABC1234">
        <input type="submit" name="buscar" value="Buscar">
    </form>

    <br>

    <!-- Botón para mostrar todos -->
    <form action="index.php" method="post">
        <input type="submit" name="mostrar_todos" value="Mostrar todos">
    </form>

    <hr>

    <?php

    if (isset($_POST['buscar']) && !empty($_POST['matricula'])) {
        BuscarPorMatricula($_POST['matricula']);
    }

    if (isset($_POST['mostrar_todos'])) {
        MostrarTodos();
    }
    ?>
</body>
</html>