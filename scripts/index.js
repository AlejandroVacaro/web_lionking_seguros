let nombre;
let edadActual;
let edadComienzoRenta;
let capitalInicial;
let perioricidadCobro;

let confirmarCondiciones = confirm("Para continuar por favor confirme haber leído y estar de acuerdo con nuestros términos y condiciones.");

if (confirmarCondiciones == true) {

    nombre = prompt("Ingrese su nombre completo:").toUpperCase();
    edadActual = parseInt(prompt("Indique su edad actual:"));
    edadComienzoRenta = parseInt(prompt("Indique desde qué edad le gustaría comenzar a recibir su renta:"));

    if (edadActual > edadComienzoRenta) {
        alert("Lo sentimos, su edad actual es mayor a la edad en que desea comenzar a cobrar su renta. Inténtelo de nuevo.");
    } else {

        capitalInicial = parseFloat(prompt("Indique el capital total a depositar (no utilice separadores de miles e indique los centavos con un punto):"));
        perioricidadCobro = parseInt(prompt("¿Desea cobrar su renta de forma mensual o anual? Indique con 1 si desea cobrarlo una vez por año o con un 2 si desea cobrarlo de forma mensual."));

        let periodoCapitalizacion = parseInt((edadComienzoRenta - edadActual));
        let cicloCapitalizacion = 1;
        let capitalFinal = capitalInicial;
        let periodoDesacumulacion = (85 - edadComienzoRenta);

        while (cicloCapitalizacion <= periodoCapitalizacion) {
            capitalFinal = capitalFinal + (capitalFinal * 0.09);
            cicloCapitalizacion++;
        }

        let rentaAnual = ((capitalFinal / parseFloat(periodoDesacumulacion)) * 0.98).toFixed(2);
        let rentaMensual = (rentaAnual / 12).toFixed(2);

        switch (perioricidadCobro) {

            case 1:
                alert("Estimado/a " + nombre + ": su renta anual nominal sería de $" + rentaAnual);
                break;

            case 2:
                alert("Estimado/a " + nombre + ": su renta mensual nominal sería de $" + rentaMensual);
                break;

            default:
                alert("Lo sentimos, nuestro cotizador falló porque no ingresó correctamente 1 o 2 para definir la perioricidad del cobro, inténtelo nuevamente.")

        }
    }


} else {
    alert("Lo sentimos, pero no podemos continuar con la cotización de la renta si no está de acuerdo con nuestros términos y condiciones.");
}


