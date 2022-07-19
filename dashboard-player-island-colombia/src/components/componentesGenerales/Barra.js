import React from "react";
import './cssGenerales/barra.css';

function Barra(props) {

    
    let estilo= {
       backgroundColor: props.colores,
       width : `${props.valor*2}%`
       
    }
    return (
        <div className="barra" style={estilo}>
            {props.valor}%
        </div>
    );
  }
  
  export default Barra;