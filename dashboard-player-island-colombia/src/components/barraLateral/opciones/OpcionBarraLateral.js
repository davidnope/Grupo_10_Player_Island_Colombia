import React from "react";
import './opcionBarraLateral.css'

function OpcionBarraLateral(props){
    return(
        <div className="opcion-barra-lateral">
            {props.icon}
            <p>{props.opcion}</p>
        </div>
    )
}

export default OpcionBarraLateral;