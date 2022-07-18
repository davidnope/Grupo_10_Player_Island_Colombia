import React from "react";
import '../tableros.css'

import PestUsuario from './pestañasUsuario/PestUsuario'
import PestListadoUsuarios from './pestañasUsuario/PestListadoUsuarios'
import PestañasTablero from '../pestañas/PestañasTablero'

import { Routes, Route, Link} from 'react-router-dom';

// Info etiquetas
let nombreEtiquetas = ['Usuario', 'Listado'];
let rutas = ['/Usuarios/PestUsuario', '/Usuarios/PestListadoUser']

function TableroUsuario(props) {
  let componente;
  switch(props.pestaña){
    case 'PestUsuario': componente = <PestUsuario/>
    break;
    case 'PestListadoUser': componente = <PestListadoUsuarios/>
    break;
  }
  return (
    <div className="contenedor-tablero">
      <div className="contendor-pestaña">
        {
          nombreEtiquetas.map((nombre, i) => {
            return <PestañasTablero
            nombreEtiqueta={nombre}
            ruta = {rutas[i]}
            key ={i}
          />
          })
        }
      </div>
      {
        componente
      }
    </div>
  );
}

export default TableroUsuario;