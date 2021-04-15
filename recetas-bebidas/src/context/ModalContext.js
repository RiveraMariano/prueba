import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// CREAR EL CONTEXT
export const ModalContext = createContext();

// PROVIDER ES DONDE SE ENCUENTRAN LAS FUNCIONES Y STATE
const ModalProvider = (props) => {

    // CREAR EL STATE DEL CONTEXT
    const [id, setIdReceta] = useState(null);
    const [informacion, setInformacion] = useState({});

    // EJECUTAR LLAMADO A LA API
    useEffect(() => {
        const obtenerReceta = async () => {
            if (!id) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
            const resultado = await axios(url);
            setInformacion(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [id]);

    return (
        <ModalContext.Provider value={{ informacion, setIdReceta, setInformacion }}>
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;