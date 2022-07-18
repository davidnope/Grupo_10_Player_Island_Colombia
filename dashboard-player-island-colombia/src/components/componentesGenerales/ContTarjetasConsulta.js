import React from "react";
import './cssGenerales/contTarjetasConsulta.css';
import Barra from './Barra';

import TarjetasEstadisticas from "./TarjetasEstadisticas";
import TarjetaUser from "./TarjetaUser";

function ContTarjetasConsulta(props) {

    return (
        <div className="contenedorTarjetasConsulta">
            {props.tarjEstadistica}
            {props.tarjUser}
        </div>
    );
}

export default ContTarjetasConsulta;