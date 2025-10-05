function hola_mundo()
{
    var div1 = document.getElementById('mensaje');
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