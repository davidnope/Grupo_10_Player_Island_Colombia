import React from "react";
import './cssGenerales/tarjetaList.css';
import { Link } from 'react-router-dom';

function TarjetaList(props) {
    return (
        <div className="contenedorTarjetaList">
            <div className="tarjetaList">
                <div className="tarjetaList-colums">
                    <h4 className="colum-id">Id</h4>
                    <h4 className="colum-name-titulo">Nombre</h4>
                    <h4 className="colum-email">{props.tipo1}</h4>
                    <h4 className="colum-typeUser">{props.tipo2}</h4>
                </div>
                {
                    props.id.map((id, i)=>{
                        return <div className="tarjetaList-colums" key={i+i}>
                        {id}
                        {props.nombre[i]}
                        {props.datoTipo1[i]}
                        {props.datoTipo2[i]}
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default TarjetaList;


{/* <div className="tarjetaList-colums colum-id">
                    <h4>Id</h4>
                    {props.id}
                    

                </div>
                <div className="tarjetaList-colums colum-name">
                    <h4>Nombre</h4>
                    {props.nombre}
                </div>
                <div className="tarjetaList-colums colum-email">
                    <h4>{props.tipo1}</h4>
                    {props.datoTipo1}
                </div>
                <div className="tarjetaList-colums colum-typesUer">
                    <h4>{props.tipo2}</h4>
                    {props.datoTipo2}
                </div> */}