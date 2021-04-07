import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // LIBRERIA DE CREACION DE ID'S ALEATORIOS
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    // CREACION DEL STATE DE CITAS
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // CREACION DEL STATE DE MENSAJE DE ERROR
    const [error, setError] = useState(false);

    // FUNCION QUE SE EJECUTA CADA VEZ QUE SE ESCRIBE EN UN INPUT
    const actualizarState = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // DESTRUCTURING, O EXTRACION DE LOS VALORES (PARA NO USAR CITA.MASCOTA, ETC)
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // FUNCION QUE SE EJECUTA CUANDO EL USUARIO PRESIONA EL BOTON DE AGREGAR CITA
    const submitCita = e => {

        // FUNCIONA PARA QUE NO SE RECARGUE EL FORMULARIO, COMO AJAX
        e.preventDefault();

        // PASO 1: VALIDACION
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
            || hora.trim() === '' || sintomas.trim() === '') {
            setError(true);
            return;
        }
        // PASO 1.1: ELIMINAR EL MENSAJE DE ERROR
        setError(false);

        // PASO 2: ASIGNACION DE UN ID A LA CITA
        cita.id = uuidv4();
        console.log(cita);

        // PASO 3: CREACION DE LA CITA
        crearCita(cita);

        // PASO 4: REINICIO DEL FORMULARIO
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    // CODIGO JSX
    return (
        <Fragment>
            <h2>Crear Cita</h2>
            { error ? <p className="alerta-error">Todos los Campos son Obligatorios</p> : null}
            <form>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño Mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="button"
                    className="u-full-width button agregar"
                    onClick={submitCita}
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
} // FIN FUNCION FORMULARIO

// TESTING UNITARIO
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

// EXPORT DEL COMPONENTE
export default Formulario;