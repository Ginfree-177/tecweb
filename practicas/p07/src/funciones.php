<?php
function EsMultiplo5y7($num) {
    if ($num % 5 == 0 && $num % 7 == 0) {
        return "El número $num SÍ es múltiplo de 5 y 7.";
    } else {
        return "El número $num NO es múltiplo de 5 y 7.";
    }
}
?>