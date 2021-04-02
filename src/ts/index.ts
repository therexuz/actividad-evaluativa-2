let form = <HTMLFormElement>document.getElementById("formulario");
let clearFormBtn = <HTMLButtonElement>document.getElementById("clear");

form.addEventListener("submit", function (event: any) {
    /*const validateForm: Boolean = validarDatos(form);

    if (validateForm) {
    }*/

    const succesMsg = document.body;
    const img = encodeURIComponent("./img/ok.png");
    succesMsg.innerHTML =
        "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
        "<img src=" +
        img +
        ">";

    event.preventDefault();
});

clearFormBtn.addEventListener("click", function (event: any) {
    form.reset();
    event.preventDefault();
});

function validarDatos(form: HTMLFormElement) {
    
    const firstname = (<HTMLInputElement>form.elements.namedItem("firstname")).value;
    const lastname = (<HTMLInputElement>form.elements.namedItem("lastname")).value;
    const rut = (<HTMLInputElement>form.elements.namedItem("rut")).value;
    const email = (<HTMLInputElement>form.elements.namedItem("email")).value;
    const phone = (<HTMLInputElement>form.elements.namedItem("phone")).value;
    const languagesList = <RadioNodeList>form.elements.namedItem("languages");

    const selectedLanguages: Array<String>= [];

    languagesList.forEach(languageElements => {
        const input = <HTMLInputElement>languageElements

        if(input.checked){
            console.log(input.value)
            selectedLanguages.push(input.value)
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


const input: any = document.getElementById("range");
console.log(input);
actualizarInput(input);

input.addEventListener("input", function (event: any) {
    actualizarInput(input);
    event.preventDefault();
});

function actualizarInput(input: any) {
    const span = input.parentElement.querySelector('span');
    span.innerHTML = input.value;
}

