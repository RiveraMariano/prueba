import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

// PRESUPUESTO NEGATIVO PERMITIDO

function App() {

  // DEFINIR EL STATE
  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [pregunta, setPregunta] = useState(true);
  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({});
  const [creargasto, setCrearGasto] = useState(false);

  // USEEFECT QUE ACTUALIZA EL RESTANTE
  useEffect(() => {

    // PASO 1: CREAR NUEVO GASTO
    if (creargasto) {
      setGastos([
        ...gastos,
        gasto
      ])

      // PASO 2: RESTA DEL PRESUPUESTO ACTUAL
      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);
    }

    // PASO 3: RESETEAR A FALSE
    setCrearGasto(false);

  }, [creargasto, gasto, gastos, presupuesto, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {pregunta ?
            (
              <Pregunta
                setPresupuesto={setPresupuesto}
                setRestante={setRestante}
                setPregunta={setPregunta}
              />
            ) : (
              <div className="row">
                <div className="one-half column">
                  <Formulario
                    setGasto={setGasto}
                    setCrearGasto={setCrearGasto}
                  />
                </div>
                <div className="one-half column">
                  <Listado gastos={gastos} />
                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

export default App;
