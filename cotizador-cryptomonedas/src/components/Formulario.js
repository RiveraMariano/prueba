import React, { useState, useEffect } from 'react';
import Error from './Error';
import useMoneda from '../hooks/useModeda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import styled from '@emotion/styled';
import axios from 'axios';

// STYLED COMPONENTS
const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {

    // STATE DEL LISTADO DE CRIPTOMONEDAS
    const [listacripto, setLista] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'CRC', nombre: 'Colón' },
    ]

    // UTILIZAR USEMONEDA, LOS NOMBRES NO IMPORTAN, EL ORDEN SI
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // UTILIZAR USECRIPTOMONEDA
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Cryptomoneda', '', listacripto);

    // EJECUTAR LLAMADO A LA API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setLista(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // CUANDO EL USUARIO HACE SUBMIT
    const cotizarMoneda = e => {
        e.preventDefault();

        // PASO 1: VALIDAR SI AMBOS CAMPOS ESTAN LLENOS
        if (moneda === '' || criptomoneda === '') {
            setError(true);
            return;
        }

        // PASO 2: PASAR LOS DATOS AL COMPONENTE PRINCIPAL
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Todos los Campos son Obligatorios" /> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;