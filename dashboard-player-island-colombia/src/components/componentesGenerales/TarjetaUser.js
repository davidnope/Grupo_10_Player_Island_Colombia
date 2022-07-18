import React from "react";
import './cssGenerales/tarjetasEstadisticas.css';
import './cssGenerales/tarjetaUser.css';
import Barra from './Barra';


let color = ['#EFEF1B', '#EF9A1B', '#B302E9', '#E90257', '#3FEF1B'];
function TarjetaUser() {

    return (
        <div className="contenedorTotalTarjetaEstadistica">
            <h3>Ultimo usuario creado</h3>
            <div className="tarjetaUser">
                <div className="contenedorImg">
                    <div className="imgUserTarjet"></div>
                    <div className="textUserType">
                        <h4>Tipo de usuario:</h4>
                        <p>Vendedor</p>
                    </div>
                </div>
                <div className="infoUser">
                    <p><b>Nombre:</b> David Ricardo Nope A</p>
                    <p><b>Correo:</b> dnope745@gmail.com</p>
                    <p><b>Celular:</b> 314 25895644</p>
                </div>
            </div>
        </div>
    );
}

export default TarjetaUser;