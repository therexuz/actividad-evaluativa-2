let form = <HTMLFormElement>document.getElementById("formulario");
let clearFormBtn = <HTMLButtonElement>document.getElementById("clear");

form.addEventListener("submit", function (event: Event) {
    
    const validacion=validarDatos(form);
    
    if(validacion){
        const succesMsg = document.body;
        const img = encodeURIComponent("./img/ok.png");
        succesMsg.innerHTML =
            "<h1>hemos recibido sus datos, pronto nos estaremos comunicando con usted</h1>" +
            "<img src=" +
            img +
            ">"; 
    }else{
        const errorMsg= <HTMLElement>document.getElementById("error")
        errorMsg.innerHTML="<h3>ERROR: COMPLETE TODOS LOS CAMPOS</h3>"
        event.preventDefault();
        return false
    }
    

    event.preventDefault();
});

clearFormBtn.addEventListener("click", function (event: any) {
    form.reset();
    event.preventDefault();
});

function validarDatos(form: HTMLFormElement):boolean {
   
    const firstname = (<HTMLInputElement>form.elements.namedItem("firstname")).value;
    const lastname = (<HTMLInputElement>form.elements.namedItem("lastname")).value;
    const rut = (<HTMLInputElement>form.elements.namedItem("rut")).value;
    const email = (<HTMLInputElement>form.elements.namedItem("email")).value;    
    const phone = (<HTMLInputElement>form.elements.namedItem("phone")).value;
    const languagesList = <RadioNodeList>form.elements.namedItem("languages");
    const selectedLanguages: Array<String>= [];
    const experience = <RadioNodeList>form.elements.namedItem("years")
    let contador=0

    experience.forEach(function(expElements){
        const input =<HTMLInputElement>expElements
        if(input.checked){
            contador=contador+1
        }
    })

    if(contador<1)return false
    if(firstname=="") return false;
    if(lastname=="") return false;
    if(rut=="") return false;
    const rutValido:boolean=validarRut(rut);
    if(!rutValido) return false
    if(email=="") return false;
    if(phone=="") return false;

    //Validacion de checkbox//
    languagesList.forEach(languageElements => {
        const input = <HTMLInputElement>languageElements
        
        if(input.checked){
            console.log(input.value);
            selectedLanguages.push(input.value)
        }
    });

    if(selectedLanguages.length<1) return false;
    return true;
}

function validarRut(rut:string):boolean{
    if(rut=="" || rut=="/\./")return false;

    const serie:number[]=[2,3,4,5,6,7,2,3]
    const [numRut,numVerificador] = rut.split("-")
    const numeros: string[] = numRut.split("")
    let suma:number=0;

    numeros.reverse().map(function(num,i){
        suma += Number(num) * serie[i]
    })

    const module = suma % 11;
    const Verificador = 11 - module;
    
    const k = "k"
    const zero = "0"
    const rutErr=<HTMLElement>document.getElementById("rutError")

    if(Verificador==Number(numVerificador)){
        console.log("RUT VALIDO");
        return true
    }
    else if(Verificador==11){
        if(numVerificador!=zero){
            rutErr.innerHTML="<p>Rut Invalido</p>"
            console.log("RUT INVALIDO");
            return false
        } 
        console.log("RUT VALIDO");

    }else if(Verificador==10){
        if(numVerificador!=k){
            rutErr.innerHTML="<p>Rut Invalido</p>"
            console.log("RUT INVALIDO");
            return false
        } 
        console.log("RUT VALIDO");
    }
    else{
        rutErr.innerHTML="<p>Rut Invalido</p>"
        console.log("RUT INVALIDO");
        return false
    }
    return true
}

const rutInput = <HTMLInputElement>document.getElementById("rut")

rutInput.addEventListener("change",function(event:Event){
    const rutErr=<HTMLElement>document.getElementById("rutError")
    rutErr.removeChild
    event.preventDefault()
})

/**
 * Funciones que actualizan el dato a la derecha del Range-slider
 */

const input: any = document.getElementById("range");
actualizarInput(input);

input.addEventListener("input", function (event: any) {
    actualizarInput(input);
    event.preventDefault();
});

function actualizarInput(input: any) {
    const span = input.parentElement.querySelector("span");
    span.innerHTML = input.value;
}


