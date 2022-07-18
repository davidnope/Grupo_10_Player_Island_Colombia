import React from "react";
import '../../pestañasTableros.css'

// COMPONENTES
import TarjetaGrandeDescription from "../../../componentesGenerales/TarjetaGrandeDescription";
import TarjetaList from "../../../componentesGenerales/TarjetaList";

function PestListadoUsuarios() {
  return (
      <div className="info-tablero">
        <h3>Listado de usuarios</h3>
        <div className="info-tablero-row">
        <TarjetaGrandeDescription/>
        <TarjetaList/>
        </div>
    </div>
  );
}

export default PestListadoUsuarios;