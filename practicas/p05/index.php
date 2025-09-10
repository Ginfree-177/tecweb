<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Práctica 3</title>
</head>
<body>
    <h2>Ejercicio 1</h2>
    <p>Determina cuál de las siguientes variables son válidas y explica por qué:</p>
    <p>$_myvar,  $_7var,  myvar,  $myvar,  $var7,  $_element1, $house*5</p>
    <?php //Ejercicio 1
        //AQUI VA MI CÓDIGO PHP
        $_myvar;
        $_7var;
        //myvar;       // Inválida
        $myvar;
        $var7;
        $_element1;
        //$house*5;     // Invalida
        
        echo '<h4>Respuesta:</h4>';   
    
        echo '<ul>';
        echo '<li>$_myvar es válida porque inicia con guión bajo.</li>';
        echo '<li>$_7var es válida porque inicia con guión bajo.</li>';
        echo '<li>myvar es inválida porque no tiene el signo de dolar ($).</li>';
        echo '<li>$myvar es válida porque inicia con una letra.</li>';
        echo '<li>$var7 es válida porque inicia con una letra.</li>';
        echo '<li>$_element1 es válida porque inicia con guión bajo.</li>';
        echo '<li>$house*5 es inválida porque el símbolo * no está permitido.</li>';
        echo '</ul>';

        //Ejercicio 2
        $a = "ManejadorSQL";
        $b = 'MySQL';
        $c = &$a;

        echo $a;
        echo '<br>'; //Agregue los saltos de linea para ciaualizar mejor cada variable
        echo $b; 
        echo '<br>';
        echo $c;

        echo "Se destruyeron las variables $a y $b";
        unset($a, $b);
        
        echo "Para posteriormente volverse a definir";
        $a = "PHP server";
        $b = &$a;

        echo "Y escribirse";
        echo '<br>';
        echo $a;
        echo '<br>';
        echo $b;
        //$c=$b * 10;
        //@$c=$b * 10; (para evitar warnings)
    ?>
</body>
</html>