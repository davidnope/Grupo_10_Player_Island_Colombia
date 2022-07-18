import React from "react";
import './cssGenerales/tarjetaUserGrande.css';


let color = ['#EFEF1B', '#EF9A1B', '#B302E9', '#E90257', '#3FEF1B'];
function TarjetaUserGrande() {
    return (
        <div className="contenedorTarjetaUserGrande">
            <div className="tarjetaUserGrande">
                <div className="contenedorImg">
                    <div className="imgUserTarjet"></div>
                    <div className="textUserType">
                        <h4>Tipo de usuario:</h4>
                        <p>Vendedor</p>
                    </div>
                </div>
                <p><b>Nombre:</b> David Ricardo Nope A</p>
                <p><b>Correo:</b> dnope745@gmail.com</p>
                <p><b>Celular:</b> 314 25895644</p>
                <p><b>Cantidad de prodcutos:</b> 314</p>
            </div>
        </div>
    );
}

export default TarjetaUserGrande;