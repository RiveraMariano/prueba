import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
// import Info from './components/Info';
import axios from 'axios';

function App() {

  // STATES
  const [resultado, setResultado] = useState({});
  const [letra, setLetra] = useState('');
  // const [info, setInfo] = useState({});

  useEffect(() => {
    if (Object.keys(resultado).length === 0) return;

    // CONSULTAR LA APIS
    const consultarApiLetra = async () => {
      const { artista, cancion } = resultado;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    //const url2 = `theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const resultadoFinal = await axios(url);
      //const resultadoFinal2 = await axios(url2);

      //AMBAS SE EJECUTAN AL MISMO TIEMPO
      // const [lyrics, informacion] = await Promise.all([
      //   axios.get(url),
      //   axios.get(url2)
      // ]);

      setLetra(resultadoFinal.data.lyrics);
      //setInfo(resultadoFinal2.data.artists[0]);
    }
    consultarApiLetra();
  }, [resultado]);

  return (
    <Fragment>
      <Formulario setResultado={setResultado} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {/* <Info info={info} /> */}
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
