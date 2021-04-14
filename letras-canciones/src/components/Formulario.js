import React, { useState } from 'react';

const Formulario = ({ setResultado }) => {

    // STATES
    const [busqueda, setBusqueda] = useState({
        artista: '',
        cancion: ''
    });

    const [error, setError] = useState(false);

    // DESTRUCTURING STATE
    const { artista, cancion } = busqueda;

    // FUNCION PARA LEER EL INPUT
    const actualizarState = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    // CONSULTAR LAS APIS
    const buscarInformacion = e => {
        e.preventDefault();

        // PASO 1: VALIDAR
        if (artista.trim() === '' || cancion.trim === '') {
            setError(true);
            return;
        }
        setError(false);

        // PASO 2: PASAR A APP.JS
        setResultado(busqueda);
    }

    return (
        <div className="bg-info">
            {error ? <p className="alert alert-danger text-center p-2">
                Todos los Campos son Obligatorios
                    </p> : null}
            <div className="container">
                <div className="row">
                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInformacion}
                    >
                        <fieldset>
                            <legend className="text-center">
                                Buscador Letras Canciones
                            </legend>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={actualizarState}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">
                                Buscar
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Formulario;