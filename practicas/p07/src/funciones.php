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

function Abcedario()
{
    $minusculas = array();

    for($i=97;$i<=122;$i++)
    {
        $minusculas[$i]=chr($i);
    }

        echo '<table style="width:10%">';   
        echo '<tr>';
        echo '<td>' . "ASCII" . '</td>';
        echo '<td>' . "Valor" . '</td>';
        echo '</tr>';

        foreach ($minusculas as $indice => $valor) {
            echo '<tr>';
            echo '<td>' . $indice . '</td>';
            echo '<td>' . $valor . '</td>';
            echo '</tr>';
        }

        echo '</table>';

}

function FormularioPersona()
{
    if(isset($_POST["sexo"]) && isset($_POST["edad"])) 
    {
        $sexo = $_POST["sexo"];
        $edad = $_POST["edad"];
            
        if($sexo == "Femenino" || $sexo == "femenino")
        {
            if(($edad >= 18) && ($edad <= 35))
            {
                echo "<p>Bienvenida, usted está en el rango de edad permitido.</p>";
            } 
            else 
            {
                echo '<h3>No permitido para el rango de edad</h3>';
            }
        } 
        else
        {
            echo "<p>Sexo no permitido</p>";
        }
    } 
    else 
    {
        echo '<h3>Campos incompletos</h3>';
    }
}

function ParqueVehicular() {
    // Definimos el arreglo en duro con 15 autos
    $vehiculos = [
        "ABC1234" => [
            "Auto" => [
                "marca" => "HONDA",
                "modelo" => 2020,
                "tipo"   => "camioneta"
            ],
            "Propietario" => [
                "nombre" => "Alfonso Esparza",
                "ciudad" => "Puebla, Pue.",
                "direccion" => "C.U., Jardines de San Manuel"
            ]
        ],
        "XYZ5678" => [
            "Auto" => [
                "marca" => "MAZDA",
                "modelo" => 2019,
                "tipo"   => "sedan"
            ],
            "Propietario" => [
                "nombre" => "Ma. del Consuelo Molina",
                "ciudad" => "Puebla, Pue.",
                "direccion" => "97 Oriente"
            ]
        ],
        "JKL2345" => [
            "Auto" => [
                "marca" => "TOYOTA",
                "modelo" => 2021,
                "tipo"   => "hachback"
            ],
            "Propietario" => [
                "nombre" => "Luis Hernández",
                "ciudad" => "CDMX",
                "direccion" => "Av. Insurgentes Sur 100"
            ]
        ],
        //Agregamos más autos hasta tener 15
        "LMN3456" => [
            "Auto" => ["marca" => "FORD", "modelo" => 2018, "tipo" => "sedan"],
            "Propietario" => ["nombre" => "Carla Romero", "ciudad" => "Guadalajara, Jal.", "direccion" => "Col. Americana"]
        ],
        "OPQ4567" => [
            "Auto" => ["marca" => "CHEVROLET", "modelo" => 2022, "tipo" => "camioneta"],
            "Propietario" => ["nombre" => "Pedro Sánchez", "ciudad" => "Monterrey, N.L.", "direccion" => "Av. Constitución 123"]
        ],
        "RST5678" => [
            "Auto" => ["marca" => "NISSAN", "modelo" => 2017, "tipo" => "sedan"],
            "Propietario" => ["nombre" => "Ana Torres", "ciudad" => "Querétaro, Qro.", "direccion" => "Calle Juárez 45"]
        ],
        "UVW6789" => [
            "Auto" => ["marca" => "KIA", "modelo" => 2020, "tipo" => "camioneta"],
            "Propietario" => ["nombre" => "Miguel López", "ciudad" => "Mérida, Yuc.", "direccion" => "Centro Histórico"]
        ],
        "DEF2345" => [
            "Auto" => ["marca" => "HYUNDAI", "modelo" => 2021, "tipo" => "hachback"],
            "Propietario" => ["nombre" => "Daniela Fernández", "ciudad" => "León, Gto.", "direccion" => "Col. Industrial"]
        ],
        "GHI3456" => [
            "Auto" => ["marca" => "VOLKSWAGEN", "modelo" => 2019, "tipo" => "sedan"],
            "Propietario" => ["nombre" => "José Pérez", "ciudad" => "Toluca, Edo. Méx.", "direccion" => "Col. Centro"]
        ],
        "JKM4567" => [
            "Auto" => ["marca" => "BMW", "modelo" => 2023, "tipo" => "sedan"],
            "Propietario" => ["nombre" => "Marta Ruiz", "ciudad" => "CDMX", "direccion" => "Polanco"]
        ],
        "NOP5678" => [
            "Auto" => ["marca" => "MERCEDES", "modelo" => 2020, "tipo" => "camioneta"],
            "Propietario" => ["nombre" => "Roberto Díaz", "ciudad" => "Cancún, Q. Roo", "direccion" => "Av. Bonampak"]
        ],
        "QRS6789" => [
            "Auto" => ["marca" => "AUDI", "modelo" => 2018, "tipo" => "sedan"],
            "Propietario" => ["nombre" => "Cecilia Gómez", "ciudad" => "Puebla, Pue.", "direccion" => "Col. La Paz"]
        ],
        "TUV7890" => [
            "Auto" => ["marca" => "TESLA", "modelo" => 2022, "tipo" => "sedan"],
            "Propietario" => ["nombre" => "Andrés Flores", "ciudad" => "CDMX", "direccion" => "Santa Fe"]
        ],
        "WXY8901" => [
            "Auto" => ["marca" => "PEUGEOT", "modelo" => 2019, "tipo" => "hachback"],
            "Propietario" => ["nombre" => "Laura Morales", "ciudad" => "Querétaro, Qro.", "direccion" => "Col. Alamos"]
        ],
        "ZAB9012" => [
            "Auto" => ["marca" => "FIAT", "modelo" => 2017, "tipo" => "hachback"],
            "Propietario" => ["nombre" => "Fernando Castro", "ciudad" => "Monterrey, N.L.", "direccion" => "San Pedro Garza García"]
        ],
    ];

    return $vehiculos;
}

// Función para mostrar todos los autos
function MostrarTodos() {
    $vehiculos = ParqueVehicular();
    echo "<pre>";
    print_r($vehiculos);
    echo "</pre>";
}

// Función para buscar por matrícula
function BuscarPorMatricula($matricula) {
    $vehiculos = ParqueVehicular();
    if (isset($vehiculos[$matricula])) {
        echo "<pre>";
        print_r($vehiculos[$matricula]);
        echo "</pre>";
    } else {
        echo "<p>No se encontró la matrícula $matricula</p>";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    FormularioPersona();
}

?>
