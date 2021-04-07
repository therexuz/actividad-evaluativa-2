"use strict";
/**
 * Se espera el evento submit para recibir el formulario
 */
var form = document.getElementById("formulario");
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
/**
 * Codigo para limpiar el formulario
 */
var clearFormBtn = document.getElementById("clear");
clearFormBtn.addEventListener("click", function (event) {
    limpiarDatos();
    event.preventDefault();
});
function limpiarDatos() {
    var nameErr = document.getElementById("nameError");
    var lastnameErr = document.getElementById("lastnameError");
    var rutErr = document.getElementById("rutError");
    var emailErr = document.getElementById("emailError");
    var phoneErr = document.getElementById("phoneError");
    var languagesErr = document.getElementById("languagesError");
    var expErr = document.getElementById("expError");
    var descErr = document.getElementById("descError");
    var errorMsg = document.getElementById("error");
    errorMsg.innerText = "";
    nameErr.innerText = "";
    lastnameErr.innerText = "";
    rutErr.innerText = "";
    emailErr.innerText = "";
    phoneErr.innerText = "";
    languagesErr.innerText = "";
    expErr.innerText = "";
    descErr.innerText = "";
    form.reset();
}
/**
 * Funciones para validar datos del formulario
 */
function validarFormulario(form) {
    var firstname = form.elements.namedItem("firstname").value;
    var lastname = form.elements.namedItem("lastname").value;
    var rut = form.elements.namedItem("rut").value;
    var email = form.elements.namedItem("email").value;
    var phone = form.elements.namedItem("phone").value;
    var languagesList = form.elements.namedItem("languages");
    var programmingLevel = form.elements.namedItem("range").value;
    var experience = form.elements.namedItem("years");
    var description = form.elements.namedItem("description").value;
    var validateForm = true;
    if (validateName(firstname)
        && validateLastname(lastname)
        && validarRut(rut)
        && validateEmail(email)
        && validatePhone(phone)
        && validateProgrammingLevel(programmingLevel)
        && validateLanguages(languagesList)
        && validateExperience(experience)
        && validateDescription(description)) {
        return true;
    }
    else {
        return false;
    }
}
function validateName(firstname) {
    if (firstname == "") {
        var nameError = document.getElementById("nameError");
        nameError.innerText = "Ingrese su nombre";
        return false;
    }
    return true;
}
function validateLastname(lastname) {
    if (lastname == "") {
        var lastnameError = document.getElementById("lastnameError");
        lastnameError.innerText = "Ingrese su apellido";
        return false;
    }
    return true;
}
function validarRut(rut) {
    var isvalid;
    var rutErr = document.getElementById("rutError");
    if (rut == "" || rut == "/./") {
        rutErr.innerText = "Ingrese su rut";
        isvalid = false;
    }
    else {
        isvalid = digitoVerificador(rut);
    }
    //console.log("rut valido");
    return isvalid;
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if (email == "") {
        var emailError = document.getElementById("emailError");
        emailError.innerText = "Ingrese su email";
        return false;
    }
    if (!re.test(email)) {
        var emailError = document.getElementById("emailError");
        emailError.innerText = "Formato de email inválido";
        return false;
    }
    return true;
}
function validatePhone(phone) {
    if (phone == "" || phone.length != 9 || phone.match(/\+/g) || phone.match(/\-/g)) {
        var phoneError = document.getElementById("phoneError");
        phoneError.innerText = "Ingrese un telefono válido";
        return false;
    }
    return true;
}
function validateLanguages(languages) {
    var selectedLanguages = [];
    languages.forEach(function (languageElement) {
        var input = languageElement;
        if (input.checked) {
            selectedLanguages.push(input.value);
        }
    });
    if (selectedLanguages.length < 1) {
        var checkboxError = document.getElementById("checkboxError");
        checkboxError.innerText = "Seleccione a lo menos 1 lenguaje";
        return false;
    }
    return true;
}
function validateProgrammingLevel(programmingLevel) {
    if (programmingLevel == "") {
        return false;
    }
    return true;
}
function validateExperience(experience) {
    var contador = 0;
    experience.forEach(function (expElements) {
        var input = expElements;
        if (input.checked) {
            contador = contador + 1;
        }
    });
    if (contador < 1) {
        var expError = document.getElementById("expError");
        expError.innerText = "Elija una opcion";
        return false;
    }
    return true;
}
function validateDescription(description) {
    if (description.length > 300) {
        var descError = document.getElementById("descError");
        descError.innerText = "Cantidad de caracteres no permitida";
        return false;
    }
    if (description == "") {
        var descError = document.getElementById("descError");
        descError.innerText = "Por favor rellene la descripción";
        return false;
    }
    return true;
}
function digitoVerificador(rut) {
    var isvalid;
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
        isvalid = true;
    }
    else if (Verificador == 11) {
        if (numVerificador != zero) {
            rutErr.innerText = "Rut Inválido";
            isvalid = false;
        }
        else {
            isvalid = true;
        }
    }
    else if (Verificador == 10) {
        if (numVerificador != k) {
            rutErr.innerText = "Rut Inválido";
            isvalid = false;
        }
        else {
            isvalid = true;
        }
    }
    else {
        rutErr.innerText = "Rut Inválido";
        isvalid = false;
    }
    return isvalid;
}
/**
 *  Delimitar el tamaño del input telefono
 */
var phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function (event) {
    phoneInput.oninput = function (input) {
        if (phoneInput.value.length > 9) {
            phoneInput.value = phoneInput.value.slice(0, 9);
        }
    };
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
