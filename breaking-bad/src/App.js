import React, { useState, useEffect } from 'react';
import Frase from './components/Frase';
import styled from '@emotion/styled'; // npm i @emotion/styled@10.0.23 @emotion/core@10.0.22

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 310px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 3px solid black;
  transition: background-size .8s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }
`;

function App() {

  // STATE DE FRASE
  const [frase, setFrase] = useState({});

  const consultarAPI = async () => {
    // API DEVUELVE UNA PROMESA
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    // TRADUCIMOS LA PROMESA
    const frase = await api.json();
    setFrase(frase[0]);
  }
  
  // CARGAR UNA FRASE CUANDO SE ABRE LA PAGINA
  useEffect(() => {
    consultarAPI()
  }, []);

  return (
    <Contenedor>
      <Frase frase={frase} />
      <Boton onClick={consultarAPI}>
        Obtener Frase
      </Boton>
    </Contenedor>
  );
}

export default App;
