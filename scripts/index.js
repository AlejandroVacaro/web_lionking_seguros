//REGISTRO DE POTENCIALES CLIENTES:

//Variables globales

let nombre;
let documento;
let fechaNacimiento;
let correo;
let capitalInicial;
let edadRetiro;
let periodicidad;


// Solicitud de datos de la persona

function ingresarNombre() {
    nombre = prompt("Ingrese su nombre y apellido:").toUpperCase();
    while (nombre == "") {
        alert("Por favor, ingrese su nombre completo. Inténtelo nuevamente.");
        nombre = prompt("Ingrese su nombre y apellido:").toUpperCase();
    }
}

ingresarNombre();

function ingresarDocumento() {
    documento = parseInt(prompt("Ingrese su documento de identidad sin puntos ni guiones:"));
    while (isNaN(documento)) {
        alert("Por favor, ingrese su documento de identidad. Inténtelo nuevamente.");
        documento = parseInt(prompt("Ingrese su documento de identidad sin puntos ni guiones:"));
    }
}

ingresarDocumento();

function ingresarFechaNacimiento() {
    fechaNacimiento = prompt("Ingrese su fecha de nacimiento con el formato dd/mm/aaaa:");
    while (fechaNacimiento == "") {
        alert("Por favor, ingrese su fecha de nacimiento. Inténtelo nuevamente.");
        fechaNacimiento = prompt("Ingrese su fecha de nacimiento con el formato dd/mm/aaaa:");
    }
}

ingresarFechaNacimiento();

var fechaPartes = fechaNacimiento.split("/");
var objetoFecha = new Date(+fechaPartes[2], fechaPartes[1] - 1, +fechaPartes[0]);


function ingresarCorreo() {
    correo = prompt("Ingrese su correo electrónico");
    while (correo == "") {
        alert("Por favor, ingrese su correo electrónico. Inténtelo nuevamente.");
        correo = prompt("Ingrese su correo electrónico:");
    }
}

ingresarCorreo();

function ingresarCapital() {
    capitalInicial = parseFloat(prompt("Indique el capital total a depositar (no utilice separadores de miles e indique los centavos con un punto):"));
    while (isNaN(capitalInicial)) {
        alert("Debe ingresar el capital a depositar. Inténtelo nuevamente.");
        capitalInicial = parseFloat(prompt("Indique el capital total a depositar (no utilice separadores de miles e indique los centavos con un punto):"));
    }
}

ingresarCapital();


function Usuario(nombre, documento, fechaNacimiento, correo, capitalInicial) {
    this.nombre = nombre;
    this.documento = documento;
    this.fechaNacimiento = fechaNacimiento;
    this.correo = correo;
    this.capitalInicial = capitalInicial;
}

const Usuario1 = new Usuario (nombre, documento, fechaNacimiento, correo, capitalInicial);

console.log("Se ha creado correctamente el registro del usuario: " + Usuario1.nombre);
console.log("Se ha enviado un correo de confirmación a la casilla " + Usuario1.correo);



// CÁLCULO DE RENTA

let edadActual

function ingresarEdadRetiro() {
    edadRetiro = parseInt(prompt("Indique desde qué edad le gustaría comenzar a recibir su renta (debe ser superior a su edad actual e inferior a 85 años):"));
    while (isNaN(edadRetiro)) {
        alert("Debe ingresar la edad a la que le gustaría comenzar a recibir su renta. Inténtelo nuevamente.");
        edadRetiro = parseInt(prompt("Indique desde qué edad le gustaría comenzar a recibir su renta:"));
    }
    edadActual = Math.floor((new Date() - objetoFecha) / 31536000000)
    while (edadActual >= edadRetiro) {
        alert("Debe ingresar una edad de retiro estrictamente superior a su edad actual. Inténtelo nuevamente.");
        edadRetiro = parseInt(prompt("Indique desde qué edad le gustaría comenzar a recibir su renta (debe ser superior a su edad actual e inferior a 85 años):"));
    }
    while (edadRetiro >= 85) {
        alert("Debe ingresar una edad de retiro estrictamente menor a 85 años. Inténtelo nuevamente.");
        edadRetiro = parseInt(prompt("Indique desde qué edad le gustaría comenzar a recibir su renta (debe ser superior a su edad actual e inferior a 85 años):"));
    }
}

ingresarEdadRetiro();


function ingresarPeriodicidad() {
    periodicidadCobro = parseInt(prompt("¿Desea cobrar su renta de forma mensual o anual? Indique con 1 si desea cobrarlo una vez por año o con un 2 si desea cobrarlo de forma mensual."));

    while (isNaN(periodicidadCobro)) {
        alert("Debe ingresar con que periodicidad desea cobrar su renta. Inténtelo nuevamente.")
        periodicidadCobro = parseInt(prompt("¿Desea cobrar su renta de forma mensual o anual? Indique con 1 si desea cobrarlo una vez por año o con un 2 si desea cobrarlo de forma mensual."));
    }

    while ((periodicidadCobro !== parseInt(1)) && (periodicidadCobro !== parseInt(2))) {
        alert("Por favor ingrese únicamente 1 o 2. Inténtelo nuevamente.");
        periodicidadCobro = parseInt(prompt("¿Desea cobrar su renta de forma mensual o anual? Indique con 1 si desea cobrarlo una vez por año o con un 2 si desea cobrarlo de forma mensual."));
    }
}

ingresarPeriodicidad();

let capitalFinal = capitalInicial

const RentabilidadesAnuales = []

function cicloCapitalizacion() {
    const periodoCapitalizacion = parseInt(edadRetiro - edadActual);
    let contador = 1
    while (contador <= periodoCapitalizacion) {
        RentabilidadesAnuales.push(capitalFinal * 0.09);
        capitalFinal = capitalFinal + (capitalFinal * 0.09);
        contador++;
    }
}

cicloCapitalizacion();

let rentaAnual;

function calculoRentaAnual() {
    const rentaAnualSinComision = (capitalFinal / (85 - edadRetiro));
    rentaAnual = (rentaAnualSinComision - (rentaAnualSinComision * 0.02)).toFixed(2);
}

let rentaMensual;

function calculoRentaMensual() {
    rentaMensual = (rentaAnual / 12).toFixed(2);
}

switch (periodicidadCobro) {

    case 1:
        calculoRentaAnual();
        alert("Los datos obtenidos son meramente informativos, no siendo vinculantes para la empresa ni para el usuario, ni generando obligaciones para ninguna de las partes.");
        alert("Estimado/a " + nombre + ": su renta anual nominal sería de $" + rentaAnual);
        break;

    case 2:
        calculoRentaAnual();
        calculoRentaMensual();
        alert("Los datos obtenidos son meramente informativos, no siendo vinculantes para la empresa ni para el usuario, ni generando obligaciones para ninguna de las partes.");
        alert("Estimado/a " + nombre + ": su renta mensual nominal sería de $" + rentaMensual);
        break;

    default:
        alert("Lo sentimos, nuestro cotizador falló porque no ingresó correctamente 1 o 2 para definir la periodicidad del cobro, inténtelo nuevamente.");
}

//DETALLE DE RENTABILIDADES GENERADAS


RentabilidadesAnuales.forEach((rentabilidad) => {
    console.log("La rentabilidad obtenida para el año " + ((RentabilidadesAnuales.indexOf(rentabilidad))+1) + " es de $" + rentabilidad.toFixed(2))
})



