"use strict";
var form = document.getElementById("formulario");
var clearFormBtn = document.getElementById("clear");
var phoneInput = document.getElementById("phone");
form.addEventListener("submit", function (event) {
    var validacion = validarFormulario(form);
    if (validacion) {
        var succesMsg = document.body;
        var img = encodeURIComponent("./img/ok.png");
        succesMsg.innerHTML =
            "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
                "<img src=" + img + ">";
    }
    else {
        var errorMsg = document.getElementById("error");
        errorMsg.innerHTML = "<h3>ERROR: COMPLETE TODOS LOS CAMPOS</h3>";
        errorMsg.scrollIntoView();
        event.preventDefault();
        return false;
    }
    event.preventDefault();
});
clearFormBtn.addEventListener("click", function (event) {
    limpiarDatos();
    event.preventDefault();
});
function limpiarDatos() {
    form.reset();
}
function validarFormulario(form) {
    var firstname = form.elements.namedItem("firstname").value;
    var lastname = form.elements.namedItem("lastname").value;
    var rut = form.elements.namedItem("rut").value;
    var email = form.elements.namedItem("email").value;
    var phone = form.elements.namedItem("phone").value;
    var languagesList = form.elements.namedItem("languages");
    var selectedLanguages = [];
    var experience = form.elements.namedItem("years");
    var description = form.elements.namedItem("description");
    var re = /\S+@\S+\.\S+/;
    var contador = 0;
    var experienceSelected;
    var validateForm = true;
    experience.forEach(function (expElements) {
        var input = expElements;
        if (input.checked) {
            contador = contador + 1;
        }
    });
    if (description.value.length > 300) {
        var descError = document.getElementById("descError");
        descError.innerText = "Cantidad de caracteres no permitida";
        validateForm = false;
    }
    if (description.value == "") {
        var descError = document.getElementById("descError");
        descError.innerText = "Por favor rellene la descripción";
        validateForm = false;
    }
    if (contador < 1) {
        var expError = document.getElementById("expError");
        expError.innerText = "Elija una opcion";
        validateForm = false;
    }
    if (firstname == "") {
        var nameError = document.getElementById("nameError");
        nameError.innerText = "Ingrese su nombre";
        validateForm = false;
    }
    if (lastname == "") {
        var lastnameError = document.getElementById("lastnameError");
        lastnameError.innerText = "Ingrese su apellido";
        validateForm = false;
    }
    if (rut == "") {
        var rutError = document.getElementById("rutError");
        rutError.innerText = "Ingrese su rut";
        validateForm = false;
    }
    if (!validarRut(rut))
        validateForm = false;
    if (email == "") {
        var emailError = document.getElementById("emailError");
        emailError.innerText = "Ingrese su email";
        validateForm = false;
    }
    if (!re.test(email)) {
        var emailError = document.getElementById("emailError");
        emailError.innerText = "Formato de email inválido";
        validateForm = false;
    }
    if (phone == "" || phone.length != 9 || phone.match(/\+/g) || phone.match(/\-/g)) {
        var phoneError = document.getElementById("phoneError");
        phoneError.innerText = "Ingrese un telefono válido";
        validateForm = false;
    }
    //Validacion de checkbox//
    languagesList.forEach(function (languageElement) {
        var input = languageElement;
        if (input.checked) {
            selectedLanguages.push(input.value);
        }
    });
    if (selectedLanguages.length < 1) {
        var checkboxError = document.getElementById("checkboxError");
        checkboxError.innerText = "Seleccione a lo menos 1 lenguaje";
        validateForm = false;
    }
    return validateForm;
}
function validarRut(rut) {
    if (rut == "" || rut == "/./")
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
        return true;
    }
    else if (Verificador == 11) {
        if (numVerificador != zero) {
            rutErr.innerHTML = "<p>Rut Invalido</p>";
            return false;
        }
    }
    else if (Verificador == 10) {
        if (numVerificador != k) {
            rutErr.innerHTML = "<p>Rut Invalido</p>";
            return false;
        }
    }
    else {
        rutErr.innerHTML = "<p>Rut Invalido</p>";
        return false;
    }
    return true;
}
//delimitar el tamaño del input telefono//
phoneInput.addEventListener("input", function (event) {
    phoneInput.oninput = function (input) {
        if (phoneInput.value.length > 9) {
            phoneInput.value = phoneInput.value.slice(0, 9);
        }
    };
});
/**
 * borrar el error en rut
 */
var rutInput = document.getElementById("rut");
rutInput.addEventListener("input", function (event) {
    var rutErr = document.getElementById("rutError");
    rutErr.innerText = "";
});
/**
 * Funciones que actualizan el dato a la derecha del Range-slider
 */
var rangeSlider = document.getElementById("range");
actualizarInput(rangeSlider);
rangeSlider.addEventListener("input", function (event) {
    actualizarInput(rangeSlider);
    event.preventDefault();
});
function actualizarInput(input) {
    var span = input.parentElement.querySelector("span");
    span.innerHTML = input.value;
}
