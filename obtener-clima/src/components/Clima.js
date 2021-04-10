import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({ resultado }) => {

    // DESTRUCTURING
    const { name, main, wind } = resultado;

    // VALIDAR
    if (!name) return null;

    // GRADOS KELVIN
    const kelvin = 273.15;

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <p className="temperatura">{parseFloat(main.temp - kelvin, 10).toFixed(1)} <span>&#x2103;</span></p>
                <p className="">Temperatura Máxima: {parseFloat(main.temp_max - kelvin, 10).toFixed(1)} <span>&#x2103;</span></p>
                <p className="">Temperatura Mínima: {parseFloat(main.temp_min - kelvin, 10).toFixed(1)} <span>&#x2103;</span></p>
                <p className="">Velocidad Viento: {wind.speed} m/s</p>
            </div>
        </div>
    );
}

// TESTING UNITARIO
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Clima;