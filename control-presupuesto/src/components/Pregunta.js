import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({ setPresupuesto, setRestante, setPregunta }) => {

    // DEFINIR EL STATE DE PRESUPUESTO
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    // FUNCION QUE LEE EL PRESUPUESTO
    const definirPrespuesto = e => {
        setCantidad(parseInt(e.target.value, 10));
    }

    // SUBMIT PARA DEFINIR EL PRESUPUESTO
    const agregarPresupuesto = e => {
        e.preventDefault();

        // PASO 1: VALIDAR SI ES MENOR A 1 O NO ES UN NUMERO
        if (cantidad < 1 || isNaN(cantidad)) {
            setError(true);
            return;
        }

        // PASO 2: GUARDO CANTIDADES Y ESCONDO LA PREGUNTA
        setError(false);
        setPresupuesto(cantidad);
        setRestante(cantidad);
        setPregunta(false);
    }

    return (
        <Fragment>
            <h2>Coloca tu Presupuesto</h2>
            { error ? <Error mensaje="El Presupuesto es Incorrecto" /> : null}
            <form>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu Prespuesto"
                    onChange={definirPrespuesto}
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                    onClick={agregarPresupuesto}
                />
            </form>
        </Fragment>
    );
}

// TESTING UNITARIO
Pregunta.propTypes = {
    setPresupuesto: PropTypes.func.isRequired,
    setRestante: PropTypes.func.isRequired,
    setPregunta: PropTypes.func.isRequired
}

export default Pregunta;