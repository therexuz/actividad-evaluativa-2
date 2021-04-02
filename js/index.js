"use strict";
var form = document.getElementById("formulario");
var clearFormBtn = document.getElementById("clear");
form.addEventListener("submit", function (event) {
    /*const validateForm: Boolean = validarDatos(form);

    if (validateForm) {
    }*/
    var succesMsg = document.body;
    var img = encodeURIComponent("./img/ok.png");
    succesMsg.innerHTML =
        "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
            "<img src=" +
            img +
            ">";
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
    languagesList.forEach(function (languageElements) {
        var input = languageElements;
        if (input.checked) {
            console.log(input.value);
            selectedLanguages.push(input.value);
        }
    });
    console.log(firstname);
    console.log(lastname);
    console.log(rut);
    console.log(email);
    console.log(phone);
}
/**
 * Funciones que actualizan el dato a la derecha del Range-slider
 */
var input = document.getElementById("range");
console.log(input);
actualizarInput(input);
input.addEventListener("input", function (event) {
    actualizarInput(input);
    event.preventDefault();
});
function actualizarInput(input) {
    var span = input.parentElement.querySelector('span');
    span.innerHTML = input.value;
}
