import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({setBusqueda}) => {

    // STATES
    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    // FUNCION QUE BUSCA IMAGENES
    const buscarImagen = e => {
        e.preventDefault();

        // PASO 1: VALIDAR
        if(termino.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // PASO 2: ENVIAR EL TERMINO A APP.JS
        setBusqueda(termino);
    }

    return (
        <form onSubmit={buscarImagen}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una Imagen, Ejemplo: Manzana"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Agrega un Término de Búsqueda" /> : null}
        </form>
    );

}

export default Formulario