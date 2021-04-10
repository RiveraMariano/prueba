import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {

    // DEFINIR EL STATE
    const [error, setError] = useState(false);

    // DESTRUCTURING
    const { ciudad, pais } = busqueda;

    // FUNCION ENCARGADA DE ACTUALIZAR EL STATE
    const handleChange = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    // CUANDO EL USUARIO CLIC EN EL BOTON
    const handleClic = e => {
        e.preventDefault();

        // PASO 1: VALIDAR
        if (ciudad.trim() === '' || pais.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // PASO 2: PASARLO A APP.JS
        setConsultar(true);
    }

    return (
        <form>
            {error ? <Error mensaje="Ambos Campos son Obligatorios" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select name="pais" id="pais" value={pais} onChange={handleChange}>
                    <option value="">-- Seleccione un País --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <input
                    type="button"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    onClick={handleClic}
                />
            </div>
        </form>
    );
}

// TESTING UNITARIO
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired
}

export default Formulario;