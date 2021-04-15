import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// CREAR EL CONTEXT
export const RecetasContext = createContext();

// PROVIDER ES DONDE SE ENCUENTRAN LAS FUNCIONES Y STATE
const RecetasProvider = (props) => {

    // CREAR EL STATE DEL CONTEXT
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, setConsultar] = useState(false);

    // DESTRUCTURING
    const { nombre, categoria } = busqueda;

    // EJECUTAR LLAMADO A LA API
    useEffect(() => {
        if (consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado = await axios(url);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda, categoria, consultar, nombre]);

    return (
        <RecetasContext.Provider value={{ recetas, buscarRecetas, setConsultar }}>
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;