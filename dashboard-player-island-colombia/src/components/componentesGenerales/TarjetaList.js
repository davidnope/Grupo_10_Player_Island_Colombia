import React from "react";
import './cssGenerales/tarjetaList.css';

function TarjetaList() {
    return (
        <div className="contenedorTarjetaList">
            <div className="tarjetaList">
                <div className="tarjetaList-colums colum-id">
                    <h4>Id</h4>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                </div>
                <div className="tarjetaList-colums colum-name">
                    <h4>Nombre</h4>
                    <p>David Ricardo Nope</p>
                    <p>David Ricardo Nope</p>
                    <p>David Ricardo Nope</p>
                    <p>David Ricardo Nope</p>
                </div>
                <div className="tarjetaList-colums colum-email">
                    <h4>Email</h4>
                    <p>dnope745@gmail.com</p>
                    <p>dnope745@gmail.com</p>
                    <p>dnope745@gmail.com</p>
                    <p>dnope745@gmail.com</p>
                </div>
                <div className="tarjetaList-colums colum-typesUer">
                    <h4>Tipo usuario</h4>
                    <p>Vendedor</p>
                    <p>Vendedor</p>
                    <p>Vendedor</p>
                    <p>Vendedor</p>
                </div>
            </div>
        </div>
    );
}

export default TarjetaList;