import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [pagina, setPaginaActual] = useState(1);
  const [total, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '21150289-80cda27b61a6d8e249741ebb0';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}
      &per_page=${imagenesPorPagina}&page=${pagina}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);

      // CALCULAR EL TOTAL DE PAGINAS
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      // MOVER PANTALLA HACIA ARRIBA 
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    consultarAPI();
  }, [busqueda, pagina]);

  // DEFINIR LA PAGINA ANTERIOR
  const paginaAnterior = () => {
    const nuevaPaginaActual = pagina - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  // DEFINIR LA PAGINA SIGUIENTE
  const paginaSiguiente = () => {
    const nuevaPaginaActual = pagina + 1;
    if (nuevaPaginaActual > total) return;
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {/* SI ES LA PAGINA 1 */}
        {(pagina === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          > &laquo; Anterior</button>
        )}

        {/* SI ES LA ULTIMA PAGINA */}
        {(pagina === total) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )}

      </div>
    </div>
  );
}

export default App;
