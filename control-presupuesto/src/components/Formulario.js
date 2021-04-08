import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({ setGasto, setCrearGasto }) => {

    // DEFINIR EL STATE GASTO
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    // CUANDO EL USUARIO AGREGA UN GASTO
    const agregarGasto = e => {
        e.preventDefault();

        // PASO 1: VALIDAR
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
            setError(true);
            return;
        }
        setError(false);

        // PASO 2: CONSTRUIR EL GASTO
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        // PASO 3: PASAR GASTO A APP.JS
        setGasto(gasto);
        setCrearGasto(true);

        // PASO 4: RESETEAR FORM
        setNombre('');
        setCantidad(0);
    }

    return (
        <form>
            <h2>Agrega tus Gastos Aquí</h2>
            { error ? <Error mensaje="Ambos Campos son Obligatorios o Presupuesto Incorrecto" /> : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. VideoJuegos"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 200"
                    value={cantidad}
                    onChange={e => setCantidad(parseInt(e.target.value, 10))}
                />
            </div>
            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
                onClick={agregarGasto}
            />
        </form>
    );
}

// TESTING UNITARIO
Formulario.propTypes = {
    setGasto: PropTypes.func.isRequired,
    setCrearGasto: PropTypes.func.isRequired
}

export default Formulario;