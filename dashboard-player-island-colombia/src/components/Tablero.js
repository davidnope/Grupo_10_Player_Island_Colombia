import React from "react";
import '../App.css';

// Componentes

import TableroGeneral from './tablero/tableroGeneral/TableroGeneral';
import TableroProductos from './tablero/tableroProductos/TableroProductos';
import TableroUsuarios from './tablero/tableroUsuarios/TableroUsuarios';

// INFO

function Tablero(props) {
    let respuesta;
    switch(props.identificador){
        case 1 : respuesta = <div className='container-app'><TableroGeneral/></div>
        break;
        case 2 : respuesta = <div className='container-app'><TableroUsuarios pestaña = {props.pestaña} /></div>
        break;
        case 3 : respuesta = <div className='container-app'><TableroProductos pestaña = {props.pestaña} /></div>
        break;
    }

  return (
        respuesta
  );
}

export default Tablero;

