import React from "react";
import './tarjetaTotal.css'


function TarjetaTotal(props) {
    return (
      <div className="tarjeta">
        <div className="info-tarjeta">
            <p>{props.titulos}</p>
            <h2>{props.valor}</h2>
        </div>
        <div className="icon-tarjeta">
            {props.iconos}
        </div>
      </div>
    );
  }
  
  export default TarjetaTotal;