import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';

// STYLED COMPONENTS
const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const MensajeError = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setCargando }) => {

    // DEFINIR STATES
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, setError] = useState(false);

    // DESTRUCTURING LOS VALORES DEL STATE
    const { marca, year, plan } = datos;

    // LEER LOS DATOS DEL FORMULARIO
    const ObtenerInformacion = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    // CUANDO EL USUARIO PRESIONA COTIZAR
    const cotizarSeguro = e => {
        e.preventDefault();

        // PASO 1: VALIDACION
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // BASE DE 2000
        let resultado = 2000;

        // PASO 2: OBTENER LA DIF DE ANNIOS
        const diferencia = obtenerDiferenciaYear(year);

        // PASO 3: POR ANNIO -3% PRECIO
        resultado -= ((diferencia * 3) * resultado) / 100;

        // PASO 4: IMPUESTOS AME:+15%, ASI:+5%, EUR:+30%
        resultado = calcularMarca(marca) * resultado;

        // PASO 5: IMPUESTO PLANES BASICO:+20%, COMPLETO:+50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        // PASO 6: MONTO TOTAL Y ANIMACION
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
            setResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);
    }

    return (
        <form>
            { error ? <MensajeError>Todos los Campos son Obligatorios</MensajeError> : null}
            <Campo>
                <Label>Marca</Label>
                <Select name="marca" value={marca} on onChange={ObtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select name="year" value={year} onChange={ObtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                {/* TIENEN EL MISMO NAME PARA QUE SOLO
                SE PUEDA SELECCIONAR UNO DE LOS 2 */}
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={ObtenerInformacion}
                /> Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={ObtenerInformacion}
                /> Completo
            </Campo>
            <Boton type="button" onClick={cotizarSeguro}>Cotizar</Boton>
        </form>
    );
}

// TESTING UNITARIO
Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}

export default Formulario;