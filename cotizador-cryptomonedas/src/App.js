import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import styled from '@emotion/styled'; // npm i @emotion/styled@10.0.23 @emotion/core@10.0.22
import axios from 'axios'; // npm i axios@0.19.0
import imagen from './cryptomonedas.png';


// STYLED COMPONENTS
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // EVITAMOS LA EJECUCION AUTOMATICA
      if (moneda === '') return;

      // PASO 1: CONSULTAR LA API PARA LA COTIZACION
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      // PASO 2: MOSTRAR SPINNER
      setCargando(true);

      // PASO 3: OCULTAR SPINNER
      setTimeout(() => {
        setCargando(false);
        // GUARDAR COTIZACION
        setCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // MOSTRAR SPINNER O RESULTADO
  const componente = (cargando) ? <Spinner /> : <Cotizacion cotizacion={cotizacion} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Cryptomonedas al Instante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
