import React from "react";
import './cssGenerales/barra.css';

function Barra(props) {
    return (
        <div className="barra" style={{backgroundColor: props.colores}}>
            {props.valor}%
        </div>
    );
  }
  
  export default Barra;