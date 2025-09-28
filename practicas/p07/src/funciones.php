<?php
function EsMultiplo5y7($num) {
    if ($num % 5 == 0 && $num % 7 == 0) {
        return "El número $num SÍ es múltiplo de 5 y 7.";
    } else {
        return "El número $num NO es múltiplo de 5 y 7.";
    }
}

function MatrizMx3()
{
    $ctl = 0;
    $matriz = []; // inicializar matriz

    while ($ctl != 1) {
        $n1 = rand(0, 999);
        $n2 = rand(0, 999);
        $n3 = rand(0, 999);

        // cada fila de 3 números se agrega como subarreglo
        $matriz[] = [$n1, $n2, $n3];

        // condición de salida
        if (($n1 % 2 != 0) && ($n2 % 2 == 0) && ($n3 % 2 != 0)) {
            $ctl = 1;
        }
    }

    echo count($matriz) * 3 . " números obtenidos en " . count($matriz) . " iteraciones<br><br>";

    // impresión de la matriz
    foreach ($matriz as $fila) {
        echo implode(" - ", $fila) . "<br>";
    }
}


function EnteroConWhile ($numero)
{
    echo "Encontrar entero con do while"; 
    echo "<br>";
    $bandera = true;
    while($bandera)
    {
        $aleatorio = rand();
        if ($aleatorio % $numero == 0)
        {
            $bandera = false; 
            echo "El numero ".$aleatorio." es multiplo de ".$numero;
        }
    }
    
}
    
function EnteroConDoWhile ($numero)
{
    echo "Encontrar entero con do while"; 
    echo "<br>";
    $bandera = true;
    do{
        $aleatorio = rand();
        if ($aleatorio % $numero == 0)
        {
            $bandera = false; 
            echo "El numero ".$aleatorio." es multiplo de ".$numero;
        }
    }while($bandera);
    
}
?>
