import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'; // npm i @emotion/styled@10.0.23 @emotion/core@10.0.22

// LIBRERIA DE ESTILOS DE COMPONENTES => EMOTION
const ContenedorHeader = styled.header`
    background-color: #26C6DA;  
    padding: 10px;
    font-weight: bold;
    color: #FFFFFF;
`;

// INSTALE UNAS EXTENSIONES DE VS PARA EL RELLENADO
const TextoHeader = styled.h1`
    font-style: 2rem;
    margin: 0;
    font-family: 'Slabo 27px', serif;
    text-align: center;
`;

const Header = ({ titulo }) => {
    return (
        <ContenedorHeader>
            <TextoHeader>{titulo}</TextoHeader>
        </ContenedorHeader>
    );
}

// TESTING UNITARIO
Header.propTypes = {
    titulo: PropTypes.string.isRequired,
}

export default Header;