/**
 * Se espera el evento submit para recibir el formulario
 */
let form = <HTMLFormElement>document.getElementById("formulario");
form.addEventListener("submit", function (event: Event) {
    const validacion = validarFormulario(form);
    if (validacion) {
        const succesMsg = document.body;
        const img = encodeURIComponent("./img/ok.png");
        succesMsg.innerHTML =
            "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
            "<img src=" +
            img +
            ">";
    } else {
        const errorMsg = <HTMLElement>document.getElementById("error");
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
let clearFormBtn = <HTMLButtonElement>document.getElementById("clear");
clearFormBtn.addEventListener("click", function (event: Event) {
    limpiarDatos();
    event.preventDefault();
});

function limpiarDatos() {
    const nameErr = <HTMLElement>document.getElementById("nameError");
    const lastnameErr = <HTMLElement>document.getElementById("lastnameError");
    const rutErr = <HTMLElement>document.getElementById("rutError");
    const emailErr = <HTMLElement>document.getElementById("emailError");
    const phoneErr = <HTMLElement>document.getElementById("phoneError");
    const languagesErr = <HTMLElement>document.getElementById("languagesError");
    const expErr = <HTMLElement>document.getElementById("expError");
    const descErr = <HTMLElement>document.getElementById("descError");
    const errorMsg = <HTMLElement>document.getElementById("error");

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
function validarFormulario(form: HTMLFormElement): boolean {
    const firstname = (<HTMLInputElement>form.elements.namedItem("firstname")).value;
    const lastname = (<HTMLInputElement>form.elements.namedItem("lastname")).value;
    const rut = (<HTMLInputElement>form.elements.namedItem("rut")).value;
    const email = (<HTMLInputElement>form.elements.namedItem("email")).value;
    const phone = (<HTMLInputElement>form.elements.namedItem("phone")).value;
    const languagesList = <RadioNodeList>form.elements.namedItem("languages");
    const programmingLevel = (<HTMLInputElement>form.elements.namedItem("range")).value;
    const experience = <RadioNodeList>form.elements.namedItem("years");
    const description = (<HTMLInputElement>form.elements.namedItem("description")).value;

    let validateForm: boolean = true;

    if (
        validateName(firstname) &&
        validateLastname(lastname) &&
        validarRut(rut) &&
        validateEmail(email) &&
        validatePhone(phone) &&
        validateProgrammingLevel(programmingLevel) &&
        validateLanguages(languagesList) &&
        validateExperience(experience) &&
        validateDescription(description)
    ) {
        return true;
    } else {
        return false;
    }
}

function validateName(firstname: string): boolean {
    if (firstname == "") {
        const nameError = <HTMLElement>document.getElementById("nameError");
        nameError.innerText = "Ingrese su nombre";

        return false;
    }

    return true;
}

function validateLastname(lastname: string): boolean {
    if (lastname == "") {
        const lastnameError = <HTMLElement>document.getElementById("lastnameError");
        lastnameError.innerText = "Ingrese su apellido";
        return false;
    }
    return true;
}

function validarRut(rut: string): boolean {
    let isvalid: boolean;
    const rutErr = <HTMLElement>document.getElementById("rutError");
    if (rut == "" || rut == "/./") {
        rutErr.innerText = "Ingrese su rut";
        isvalid = false;
    } else {
        isvalid = digitoVerificador(rut);
    }
    return isvalid;
}

function validateEmail(email: string): boolean {
    const re: RegExp = /\S+@\S+\.\S+/;

    if (email == "") {
        const emailError = <HTMLElement>document.getElementById("emailError");
        emailError.innerText = "Ingrese su email";
        return false;
    }
    if (!re.test(email)) {
        const emailError = <HTMLElement>document.getElementById("emailError");
        emailError.innerText = "Formato de email inválido";
        return false;
    }
    return true;
}

function validatePhone(phone: string): boolean {
    if (phone == "" || phone.length != 9 || phone.match(/\+/g) || phone.match(/\-/g)) {
        const phoneError = <HTMLElement>document.getElementById("phoneError");
        phoneError.innerText = "Ingrese un telefono válido";
        return false;
    }
    return true;
}

function validateLanguages(languages: RadioNodeList): boolean {
    const selectedLanguages: Array<String> = [];

    languages.forEach((languageElement) => {
        const input = <HTMLInputElement>languageElement;

        if (input.checked) {
            selectedLanguages.push(input.value);
        }
    });

    if (selectedLanguages.length < 1) {
        const checkboxError = <HTMLElement>document.getElementById("checkboxError");
        checkboxError.innerText = "Seleccione a lo menos 1 lenguaje";
        return false;
    }
    return true;
}

function validateProgrammingLevel(programmingLevel: string): boolean {
    if (programmingLevel == "") {
        return false;
    }
    return true;
}

function validateExperience(experience: RadioNodeList) {
    let contador = 0;
    experience.forEach(function (expElements) {
        const input = <HTMLInputElement>expElements;
        if (input.checked) {
            contador = contador + 1;
        }
    });

    if (contador < 1) {
        const expError = <HTMLElement>document.getElementById("expError");
        expError.innerText = "Elija una opcion";
        return false;
    }
    return true;
}

function validateDescription(description: string) {
    if (description.length > 300) {
        const descError = <HTMLElement>document.getElementById("descError");
        descError.innerText = "Cantidad de caracteres no permitida";
        return false;
    }
    if (description == "") {
        const descError = <HTMLElement>document.getElementById("descError");
        descError.innerText = "Por favor rellene la descripción";
        return false;
    }
    return true;
}

function digitoVerificador(rut: string): boolean {
    let isvalid: boolean;
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
        isvalid = true;
    } else if (Verificador == 11) {
        if (numVerificador != zero) {
            rutErr.innerText = "Rut Inválido";
            isvalid = false;
        } else {
            isvalid = true;
        }
    } else if (Verificador == 10) {
        if (numVerificador != k) {
            rutErr.innerText = "Rut Inválido";
            isvalid = false;
        } else {
            isvalid = true;
        }
    } else {
        rutErr.innerText = "Rut Inválido";
        isvalid = false;
    }
    return isvalid;
}

/**
 *  Delimitar el tamaño del input telefono
 */
const phoneInput = <HTMLInputElement>document.getElementById("phone");

phoneInput.addEventListener("input", function (event: Event) {
    phoneInput.oninput = function (input) {
        if (phoneInput.value.length > 9) {
            phoneInput.value = phoneInput.value.slice(0, 9);
        }
    };
});

/**
 * Funciones que actualizan el dato a la derecha del Range-slider
 */
const rangeSlider = <HTMLInputElement>document.getElementById("range");
actualizarInput(rangeSlider);

rangeSlider.addEventListener("input", function (event: any) {
    actualizarInput(rangeSlider);
    event.preventDefault();
});

function actualizarInput(input: any) {
    const span = input.parentElement.querySelector("span");
    span.innerHTML = input.value;
}
