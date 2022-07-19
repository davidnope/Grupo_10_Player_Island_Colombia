import React from "react";
import './cssGenerales/tarjetasEstadisticas.css';
import Barra from './Barra';

let color = ['#EFEF1B', '#EF9A1B', '#c1ff46', '#E90257', '#3FEF1B'];


function TarjetasEstadisticas(props) {
    
    return (
        <div className="contenedorTotalTarjetaEstadistica">
            <h3>{props.titulo}</h3>
            <div className="tarjetaEstadisitca">
                <div className="contenedorText">
                    {props.datos.map((result, i) => <p key = {i}>{result}</p>)}
                </div>
                <div className="contenedorBarras">
                    {
                       props.datos.map((result,i) =>{
                        return (
                        <Barra
                        colores = {color[i]}
                        valor = {props.valor[i]}
                        key = {i}
                         />     
                        )
                        
                        
                       } 
                       )
                    }
                </div>

            </div>
        </div>
    );
}

export default TarjetasEstadisticas;