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

function color_fondo()
{
    var col;
    col = prompt('Ingresa el color con que quierar pintar el fondo de la ventana (rojo, verde, azul)' , '' );
    switch (col) 
    {
        case 'rojo': document.bgColor='#ff0000';
        break;

        case 'verde': document.bgColor='#00ff00';
        break;

        case 'azul': document.bgColor='#0000ff';
        break;
    }
}

function mientras()
{
    let x = 1;
    let resultado = ""; // Aquí acumulamos el texto

    while (x <= 100) {
        resultado += x + "<br>"; // Agregamos cada número y salto de línea
        x++;
    }

    // Mostramos todo el resultado en el div
    const div = document.getElementById("mensaje6");
    div.innerHTML = resultado;
}

function suma()
{
    var x=1;
    var suma=0;
    var valor;
    while (x<=5)
    {
        valor = prompt('Ingresa un valor:', '');
        valor = parseInt(valor);
        suma = suma+valor;
        x = x+1;
    }
    var div1 = document.getElementById('resultado3');
    div1.innerHTML = '<p>La suma de los valores es '+suma+'</p>';
}

function hacer_mientras()
{
    var valor;
    do{
        valor = prompt('Ingresa un valor entre 0 y 999:', '');
        valor = parseInt(valor);
        var div1 = document.getElementById('mensaje7');
        var div2 = document.getElementById('mensaje8');
        div1.innerHTML = '<p>El valor '+valor+' tiene </p>';
        if (valor<10)
            div2.innerHTML = '<p>Tiene 1 dígitos </p>';
        else
        if (valor<100) 
        {
            div2.innerHTML = '<p>Tiene 2 dígitos </p>';
        }
        else 
        {
            div2.innerHTML = '<p>Tiene 2 dígitos </p>';
        }
    }while(valor!=0);
}

function ciclo_para()
{
    var f;
    var resultado;
    var div = document.getElementById('mensaje9');
    for(f=1; f<=10; f++)
    {
        resultado += f+' <br>';
    }
    div.innerHTML = resultado;
}

function mensajes1()
{
    var div = document.getElementById('mensaje10');
    div.innerHTML = `
        Cuidado<br>
        Ingresa tu documento correctamente<br>
        Cuidado<br>
        Ingresa tu documento correctamente<br>
        Cuidado<br>
        Ingresa tu documento correctamente<br>
    `;
}
function mensajes2()
{
    var div = document.getElementById('mensaje11');
    div.innerHTML = `
        Cuidado<br>
        Ingresa tu documento correctamente<br>
        `;

    var div = document.getElementById('mensaje12');
    div.innerHTML = `
        Cuidado<br>
        Ingresa tu documento correctamente<br>
        `;

    var div = document.getElementById('mensaje13');
    div.innerHTML = `
        Cuidado<br>
        Ingresa tu documento correctamente<br>
        `;
}

function mostrarRango(x1,x2) 
{
    var inicio;
    var div = document.getElementById('mensaje14');
    for(inicio=x1; inicio<=x2; inicio++) 
    {
        resultado += inicio+' ';
    }
    div.innerHTML = resultado;
}

function valores1()
{
    var valor1,valor2;
    valor1 = prompt('Ingresa el valor inferior:', '');
    valor1 = parseInt(valor1);
    valor2 = prompt('Ingresa el valor superior', '');
    valor2 = parseInt(valor2);
    mostrarRango(valor1,valor2);
}

function convertirCastellano(x) 
{
    if(x==1)
    return 'uno';
    else
    if(x==2)
    return 'dos';
    else
    if(x==3)
    return 'tres';
    else
    if(x==4)
    return 'cuatro';
    else
    if(x==5)
    return 'cinco';
    else
    return 'valor incorrecto';
}

function valores2()
{
    var div = document.getElementById('resultado4');
    var valor = prompt('Ingresa un valor entre 1 y 5', '');
    valor = parseInt(valor);
    var r = convertirCastellano(valor);
    div.innerHTML = r;
}

function convertirCastellano2(x) 
{
    switch (x) 
    {
    case 1: return "uno";
    case 2: return "dos";
    case 3: return "tres";
    case 4: return "cuatro";
    case 5: return "cinco";
    default: return "valor incorrecto";
    }
}

function valores3()
{
    var div = document.getElementById('resultado5');
    var valor = prompt('Ingresa un valor entre 1 y 5', '');
    valor = parseInt(valor);
    var r = convertirCastellano2(valor);
    div.innerHTML = r;
}
