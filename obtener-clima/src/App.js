import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  // DEFINIR EL STATE
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  // DESTRUCTURING
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = '1dc71d9256db67916b45dca6fdad5b56';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        // TRADUCIR API A JSON
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);

        // PARA PODER VOLVER A CONSULTAR
        setConsultar(false);

        // SI LA CIUDAD NO FUE ENCONTRADA
        if (resultado.cod === '404') {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    consultarAPI();
  }, [ciudad, consultar, pais]);

  // CARGA CONDICIONAL DE COMPONENTES
  let componente;
  if (error) {
    componente = <Error mensaje="No hay Resultados" />
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo='Clima React App' />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
