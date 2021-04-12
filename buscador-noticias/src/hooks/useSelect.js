import React, { useState } from 'react';

const useSelect = (stateInicial, opciones) => {

    // STATE DEL CUSTOM HOOK
    const [state, setState] = useState(stateInicial);

    const SelectNoticias = () => (
        <select className="browser-default" onChange={e => setState(e.target.value)}>
            {opciones.map(opcion => (
                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
            ))}
        </select>
    );

    return [state, SelectNoticias];

}

export default useSelect;