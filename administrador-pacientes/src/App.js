import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // ALMACENAR CITAS EN LOCAL STORAGE
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // STATE ARREGLO DE CITAS
  const [citas, setCitas] = useState(citasIniciales);

  // USEEFFECT SE EJECUTA CADA VEZ QUE OCURRE UN CAMBIO EN CITAS
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // FUNCION QUE TOMA LAS CITAS ACTUALES Y AGREGA NUEVAS
  const crearCita = cita => {
    setCitas([...citas, cita]);
  }

  // FUNCION QUE ELIMINA UNA CITA POR SU ID
  const eliminarCita = id => {
    // SI SE PONE QUE SEA === A ID, FILTER ELIMINA TODAS LAS CITAS MENOS LA QUE ESCOGIMOS
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }

  // MENSAJE DE TITULO CONDICIONAL
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas';

  // CODIGO JSX
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id} // CUANDO SE USA MAP, SIEMPRE SE NECESITA UNA KEY
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );

} // FIN FUNCION APP

export default App;
