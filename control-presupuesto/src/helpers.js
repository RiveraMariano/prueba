// ESTO ES UN ARCHIVO JS QUE SIRVE PARA LOS MULTIPLES COMPONENTES Y REDUCIR SU CODIGO

export const revisarPresupuesto = (presupuesto, restante) => {
    let clase;

    if ((presupuesto / 4) > restante) {  // 25%
        clase = "alert alert-danger";
    } else if ((presupuesto / 2) > restante) {
        clase = "alert alert-warning"; // 50%
    } else {
        clase = "alert alert-success"; // > 50%
    }

    return clase;
}