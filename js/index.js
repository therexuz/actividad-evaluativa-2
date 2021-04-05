"use strict";
var form = document.getElementById("formulario");
var clearFormBtn = document.getElementById("clear");
form.addEventListener("submit", function (event) {
    var validacion = validarDatos(form);
    if (validacion) {
        var succesMsg = document.body;
        var img = encodeURIComponent("./img/ok.png");
        succesMsg.innerHTML =
            "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
                "<img src=" +
                img +
                ">";
    }
    else {
        var errorMsg = document.getElementById("error");
        errorMsg.innerHTML = "<h3>ERROR: COMPLETE TODOS LOS CAMPOS</h3>";
        event.preventDefault();
        return false;
    }
    event.preventDefault();
});
clearFormBtn.addEventListener("click", function (event) {
    form.reset();
    event.preventDefault();
});
function validarDatos(form) {
    var firstname = form.elements.namedItem("firstname").value;
    var lastname = form.elements.namedItem("lastname").value;
    var rut = form.elements.namedItem("rut").value;
    var email = form.elements.namedItem("email").value;
    var phone = form.elements.namedItem("phone").value;
    var languagesList = form.elements.namedItem("languages");
    var selectedLanguages = [];
    var experience = form.elements.namedItem("years");
    var contador = 0;
    experience.forEach(function (expElements) {
        var input = expElements;
        if (input.checked) {
            contador = contador + 1;
        }
    });
    if (contador < 1)
        return false;
    if (firstname == "")
        return false;
    if (lastname == "")
        return false;
    if (rut == "")
        return false;
    var rutValido = validarRut(rut);
    if (!rutValido)
        return false;
    if (email == "")
        return false;
    if (phone == "")
        return false;
    //Validacion de checkbox//
    languagesList.forEach(function (languageElements) {
        var input = languageElements;
        if (input.checked) {
            console.log(input.value);
            selectedLanguages.push(input.value);
        }
    });
    if (selectedLanguages.length < 1)
        return false;
    return true;
}
function validarRut(rut) {
    if (rut == "" || rut == "/\./")
        return false;
    var serie = [2, 3, 4, 5, 6, 7, 2, 3];
    var _a = rut.split("-"), numRut = _a[0], numVerificador = _a[1];
    var numeros = numRut.split("");
    var suma = 0;
    numeros.reverse().map(function (num, i) {
        suma += Number(num) * serie[i];
    });
    var module = suma % 11;
    var Verificador = 11 - module;
    var k = "k";
    var zero = "0";
    var rutErr = document.getElementById("rutError");
    if (Verificador == Number(numVerificador)) {
        console.log("RUT VALIDO");
        return true;
    }
    else if (Verificador == 11) {
        if (numVerificador != zero) {
            rutErr.innerHTML = "<p>Rut Invalido</p>";
            console.log("RUT INVALIDO");
            return false;
        }
        console.log("RUT VALIDO");
    }
    else if (Verificador == 10) {
        if (numVerificador != k) {
            rutErr.innerHTML = "<p>Rut Invalido</p>";
            console.log("RUT INVALIDO");
            return false;
        }
        console.log("RUT VALIDO");
    }
    else {
        rutErr.innerHTML = "<p>Rut Invalido</p>";
        console.log("RUT INVALIDO");
        return false;
    }
    return true;
}
var rutInput = document.getElementById("rut");
rutInput.addEventListener("change", function (event) {
    var rutErr = document.getElementById("rutError");
    rutErr.removeChild;
    event.preventDefault();
});
/**
 * Funciones que actualizan el dato a la derecha del Range-slider
 */
var input = document.getElementById("range");
actualizarInput(input);
input.addEventListener("input", function (event) {
    actualizarInput(input);
    event.preventDefault();
});
function actualizarInput(input) {
    var span = input.parentElement.querySelector("span");
    span.innerHTML = input.value;
}
