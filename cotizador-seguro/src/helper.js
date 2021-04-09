// OBTIENE LA DIFERENCIA DE ANNIOS
export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
}

// CALCULA EL TOTAL A PAGAR SEGUN LA MARCA
export function calcularMarca(marca) {
    let incremento;
    switch (marca) {
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        default:
            break;
    }
    return incremento;
}

// CALCULA EL TIPO DE SEGURO
export function obtenerPlan(plan) {
    return (plan === 'basico') ? 1.20 : 1.50;
}

// MUESTRA LA PRIMER LETRA MAYUSCULA
export function primerMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}