import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// CREAR EL CONTEXT
export const CategoriasContext = createContext();

// PROVIDER ES DONDE SE ENCUENTRAN LAS FUNCIONES Y STATE
const CategoriasProvider = (props) => {

    // CREAR EL STATE DEL CONTEXT
    const [categorias, setCategorias] = useState([]);

    // EJECUTAR LLAMADO A LA API
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(url);
            setCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, []);

    return (
        <CategoriasContext.Provider value={{ categorias }}>
            {props.children}
        </CategoriasContext.Provider>
    );
}

export default CategoriasProvider;