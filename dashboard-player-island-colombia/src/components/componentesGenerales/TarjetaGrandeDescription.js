import React from "react";
import './cssGenerales/tarjetaUserGrande.css';
const imagenUsuario = require.context('../../img/productos', true);


let color = ['#EFEF1B', '#EF9A1B', '#B302E9', '#E90257', '#3FEF1B'];
const TarjetaUserGrande = (props) => {

    let variable = `./${props.datosDescription.imagen}`
    let estilo = props.datosDescription?.imagen ? {background: `url(${imagenUsuario(variable)})` } : null
    
    return (
        <div className="contenedorTarjetaUserGrande">
            <div className="tarjetaUserGrande">
                <div className="contenedorImg">
                    {
                        
                        estilo? <div className="imgUserTarjet" style= {estilo} ></div> : <div className="imgUserTarjet"  ></div>
                     
                    }
                    <div className="textUserType">
                    {props.datosDescription?.producto}
                    </div>
                </div>
                
                <p><font style= {{color: 'var(--naranja)',fontWeight: 'bold'}}>{props.titulos.uno}</font> {props.datosDescription?.datosUser}</p>
                <p><font style= {{color: 'var(--naranja)',fontWeight: 'bold'}}>{props.titulos.dos}</font>  {props.datosDescription?.company}</p>
                <p><font style= {{color: 'var(--naranja)',fontWeight: 'bold'}}>{props.titulos.tres}</font> {props.datosDescription?.precio}</p>
                <p><font style= {{color: 'var(--naranja)',fontWeight: 'bold'}}>{props.titulos.cuatro}</font> {props.datosDescription?.stock}</p>
            </div>
        </div>
    );
}

export default TarjetaUserGrande;