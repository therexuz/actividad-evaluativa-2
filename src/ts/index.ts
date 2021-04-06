let form = <HTMLFormElement>document.getElementById("formulario");
let clearFormBtn = <HTMLButtonElement>document.getElementById("clear");
const phoneInput = <HTMLInputElement>document.getElementById("phone");

form.addEventListener("submit", function (event: Event) {
    const validacion = validarFormulario(form);

    if (validacion) {
        const succesMsg = document.body;
        const img = encodeURIComponent("./img/ok.png");
        succesMsg.innerHTML =
            "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
            "<img src=" +img +">";
    } else {
        const errorMsg = <HTMLElement>document.getElementById("error");
        errorMsg.innerHTML = "<h3>ERROR: COMPLETE TODOS LOS CAMPOS</h3>";
        errorMsg.scrollIntoView();
        event.preventDefault();
        return false;
    }
    event.preventDefault();
});

clearFormBtn.addEventListener("click", function (event: Event) {
    limpiarDatos();
    event.preventDefault();
});

function limpiarDatos() {
    form.reset();
}

function validarFormulario(form: HTMLFormElement): boolean {
    const firstname = (<HTMLInputElement>form.elements.namedItem("firstname")).value;
    const lastname = (<HTMLInputElement>form.elements.namedItem("lastname")).value;
    const rut = (<HTMLInputElement>form.elements.namedItem("rut")).value;
    const email = (<HTMLInputElement>form.elements.namedItem("email")).value;
    const phone = (<HTMLInputElement>form.elements.namedItem("phone")).value;
    const languagesList = <RadioNodeList>form.elements.namedItem("languages");
    const selectedLanguages: Array<String> = [];
    const experience = <RadioNodeList>form.elements.namedItem("years");
    const description = <HTMLInputElement>form.elements.namedItem("description")
    const re: RegExp = /\S+@\S+\.\S+/;
    let contador = 0;
    let experienceSelected: string;
    let validateForm:boolean=true;

    experience.forEach(function (expElements) {
        const input = <HTMLInputElement>expElements;
        if (input.checked) {
            contador = contador + 1;
        }
    });

    if(description.value.length>300){
        const descError=<HTMLElement>document.getElementById("descError")
        descError.innerText="Cantidad de caracteres no permitida"
        validateForm=false;
    }
    if(description.value==""){
        const descError=<HTMLElement>document.getElementById("descError")
        descError.innerText="Por favor rellene la descripción"
        validateForm=false;
    }

    if (contador < 1){
        const expError=<HTMLElement>document.getElementById("expError")
        expError.innerText="Elija una opcion"
        validateForm=false;
    } 
    if (firstname == ""){
        const nameError=<HTMLElement>document.getElementById("nameError")
        nameError.innerText="Ingrese su nombre"
        validateForm=false;
    } 
    if (lastname == ""){
        const lastnameError=<HTMLElement>document.getElementById("lastnameError")
        lastnameError.innerText="Ingrese su apellido"
        validateForm=false;
    } 
    if (rut == ""){
        const rutError=<HTMLElement>document.getElementById("rutError")
        rutError.innerText="Ingrese su rut"
        validateForm=false;
    } 
    if (!validarRut(rut)) validateForm=false;
    if (email == ""){
        const emailError=<HTMLElement>document.getElementById("emailError")
        emailError.innerText="Ingrese su email"
        validateForm=false;
    } 
    if (!re.test(email)){
        const emailError=<HTMLElement>document.getElementById("emailError")
        emailError.innerText="Formato de email inválido"
        validateForm=false;
    }
    if (phone == "" || phone.length != 9 || phone.match(/\+/g) || phone.match(/\-/g)){
        const phoneError=<HTMLElement>document.getElementById("phoneError")
        phoneError.innerText="Ingrese un telefono válido"
        validateForm=false;
    } 

    //Validacion de checkbox//
    languagesList.forEach((languageElement) => {
        const input = <HTMLInputElement>languageElement;

        if (input.checked) {
            selectedLanguages.push(input.value);
        }
    });

    if (selectedLanguages.length < 1){
        const checkboxError=<HTMLElement>document.getElementById("checkboxError")
        checkboxError.innerText="Seleccione a lo menos 1 lenguaje"
        validateForm=false;
    } 

    return validateForm;
}

function validarRut(rut: string): boolean {
    if (rut == "" || rut == "/./") return false;

    const serie: number[] = [2, 3, 4, 5, 6, 7, 2, 3];
    const [numRut, numVerificador] = rut.split("-");
    const numeros: string[] = numRut.split("");
    let suma: number = 0;

    numeros.reverse().map(function (num, i) {
        suma += Number(num) * serie[i];
    });

    const module = suma % 11;
    const Verificador = 11 - module;

    const k = "k";
    const zero = "0";
    const rutErr = <HTMLElement>document.getElementById("rutError");

    if (Verificador == Number(numVerificador)) {
        return true;
    } else if (Verificador == 11) {
        if (numVerificador != zero) {
            rutErr.innerHTML = "<p>Rut Invalido</p>";
            return false;
        }
    } else if (Verificador == 10) {
        if (numVerificador != k) {
            rutErr.innerHTML = "<p>Rut Invalido</p>";
            return false;
        }
    } else {
        rutErr.innerHTML = "<p>Rut Invalido</p>";
        return false;
    }
    return true;
}

//delimitar el tamaño del input telefono//
phoneInput.addEventListener("input", function (event: Event) {
    phoneInput.oninput = function (input) {
        if (phoneInput.value.length > 9) {
            phoneInput.value = phoneInput.value.slice(0, 9);
        }
    };
});


/**
 * borrar el error en rut
 */
const rutInput = <HTMLInputElement>document.getElementById("rut");

rutInput.addEventListener("input", function (event: Event) {
    const rutErr = <HTMLElement>document.getElementById("rutError");
    rutErr.innerText=""
});

/**
 * Funciones que actualizan el dato a la derecha del Range-slider
 */
const rangeSlider=<HTMLInputElement>document.getElementById("range");
actualizarInput(rangeSlider);

rangeSlider.addEventListener("input", function (event: any) {
    actualizarInput(rangeSlider);
    event.preventDefault();
});

function actualizarInput(input: any) {
    const span = input.parentElement.querySelector("span");
    span.innerHTML = input.value;
}
