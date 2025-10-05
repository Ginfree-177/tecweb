function hola_mundo()
{
    var div1 = document.getElementById('mensaje1');
    div1.innerHTML = '<p> Hola Mundo </p>';
}

function variables1()
{
    var nombre = 'Juan';
    var edad = 10;
    var altura = 1.92;
    var casado = false;

    var div1 = document.getElementById('nombre1');
    div1.innerHTML = '<p> Nombre: '+nombre+'</p>';

    var div2 = document.getElementById('edad1');
    div2.innerHTML = '<p> Edad: '+edad+'</p>';

    var div3 = document.getElementById('altura1');
    div3.innerHTML = '<p> Altura: '+altura+'</p>';

    var div4 = document.getElementById('casado1');
    div4.innerHTML = '<p> Casado: '+casado+'</p>';
}

function variables2()
{
    var nombre = prompt("Nombre: ", "");
    var edad = prompt("Edad: ", 0);

    var div1 = document.getElementById('nombre2');
    div1.innerHTML = '<p> Nombre: '+nombre+'</p>';

    var div2 = document.getElementById('edad2');
    div2.innerHTML = '<p> Edad: '+edad+'</p>';
}

function operaciones()
{
    var valor1 = prompt('Introducir primer número:', '');
    var valor2 = prompt('Introducir segundo número', '');

    var suma = parseInt(valor1)+parseInt(valor2);
    var producto = parseInt(valor1)*parseInt(valor2);

    var div1 = document.getElementById('resultado1');
    div1.innerHTML = '<p> La suma de '+valor1+' y '+valor2+' es '+suma+'</p>';

    var div2 = document.getElementById('resultado2');
    div2.innerHTML = '<p> El producto de '+valor1+' y '+valor2+' es '+producto+'</p>';
}

function condicional()
{
    var nombre = prompt('Ingresa tu nombre:', '');  
    var nota = prompt('Ingresa tu nota:', '');

    if (nota>=4) 
    {
        var div1 = document.getElementById('mensaje2');
        div1.innerHTML = '<p>'+nombre+' esta aprobado con un '+nota+'</p>';
    }
}

function condicion_sino ()
{
    var num1,num2;
    num1 = prompt('Ingresa el primer número:', '');
    num2 = prompt('Ingresa el segundo número:', '');
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    var div1 = document.getElementById('mensaje3');
    if (num1>num2) 
    {
        div1.innerHTML = '<p>El numero mayor es '+num1+'</p>';
    }
    else 
    {
        div1.innerHTML = '<p>El numero mayor es '+num2+'</p>';
    }
}

function condicion_anidado ()
{
    var nota1,nota2,nota3;

    nota1 = prompt('Ingresa 1ra. nota:', '');
    nota2 = prompt('Ingresa 2da. nota:', '');
    nota3 = prompt('Ingresa 3ra. nota:', '');

    //Convertimos los 3 string en enteros
    nota1 = parseInt(nota1);
    nota2 = parseInt(nota2);
    nota3 = parseInt(nota3);

    var pro;
    pro = (nota1+nota2+nota3)/3;

    var div1 = document.getElementById('mensaje4');

    if (pro>=7) 
    {
        div1.innerHTML = '<p>Aprobado</p>';
    }
    else
    {
        if (pro>=4) 
        {
            div1.innerHTML = '<p>Regular</p>';
        }
        else 
        {
            div1.innerHTML = '<p>Reprobado</p>';
        }
    }
}

function condiciones()
{
    var valor;
    valor = prompt('Ingresar un valor comprendido entre 1 y 5:', '' );
    //Convertimos a entero
    valor = parseInt(valor);
    var div1 = document.getElementById('mensaje5');
    switch (valor) 
    {
    case 1: div1.innerHTML = '<p>uno</p>';
    break;

    case 2: div1.innerHTML = '<p>dos</p>';
    break;

    case 3: div1.innerHTML = '<p>tres</p>';
    break;

    case 4: div1.innerHTML = '<p>cuatro</p>';
    break;

    case 5: div1.innerHTML = '<p>cinco</p>';
    break;

    default:div1.innerHTML = '<p>debe ingresar un valor comprendido entre 1 y 5.</p>'
    }
}