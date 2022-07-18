import React from "react";
import './pestañasTablero.css'

import { Routes, Route, Link} from 'react-router-dom';

function PestañasTablero(props) {
  let respuesta;
  props.ruta ? respuesta = <><Link to = {props.ruta} className="pestaña"><p>{props.nombreEtiqueta}</p></Link></> : respuesta = <div className="pestaña"><p>{props.nombreEtiqueta}</p></div>
    return (  
      respuesta
    );
  }
  
  export default PestañasTablero;