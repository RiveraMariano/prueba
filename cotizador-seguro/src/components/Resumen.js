import React from 'react';
import { primerMayuscula } from '../helper';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

// STYLED COMPONENTS
const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    // DESTRUCTURING DATOS
    const {marca, year, plan} = datos;

    if (marca === '' || year === '' || plan === '') return null;
    return (
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {primerMayuscula(datos.marca)}</li>
                <li>Plan: {primerMayuscula(datos.plan)}</li>
                <li>Año del Auto: {primerMayuscula(datos.year)}</li>
            </ul>
        </ContenedorResumen>
    );
}

// TESTING UNITARIO
Resumen.propTypes = {
    datos: PropTypes.object.isRequired,
}

export default Resumen;