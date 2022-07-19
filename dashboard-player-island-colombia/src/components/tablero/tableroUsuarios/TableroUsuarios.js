import React from "react";
import '../tableros.css'

import PestUsuario from './pestañasUsuario/PestUsuario'
import PestListadoUsuarios from './pestañasUsuario/PestListadoUsuarios'
import PestañasTablero from '../pestañas/PestañasTablero'

import {useState, useEffect} from "react";


let porcentaje = (dato,total)=>{
  return ((dato*100)/total).toFixed(1)
 
}

// Info etiquetas
let nombreEtiquetas = ['Usuario', 'Listado'];
let rutas = ['/Usuarios/PestUsuario', '/Usuarios/PestListadoUser']

// Info usuarios - infoTarjetaDescripcion
let infoTarjetaTitulos = ['Nombre:', 'Email:', 'Celular:', 'Cantidad de productos:']

// Info Listausuarios


function TableroUsuario(props) {

  const [infoTipoUser, setInfoTipoUser] = useState(['Id-Tipo usuario'])
  const [infoTarjetaDescripcion, setInfoTarjetaDescripcion] = useState(['', '', '', ''])
  const [listUser, setListUser] = useState([])
  const [valoresTotales,setValoresTotales] = useState([])
  const [porcentajes,setPorcentajes] = useState([])
 
  useEffect(()=>{
    debugger
    fetch('http://localhost:3030/api/user/list')
    .then(result => result.json())
    .then(list =>{
        setListUser(list.data)
        let totalVendedor = list.data.filter(user=> user.type_user === 'Vendedor' || user.type_user === 'vendedor' )
        let totalComprador = list.data.filter(user=> user.type_user === 'Comprador' || user.type_user === 'comprador' )
        setValoresTotales ( [totalVendedor.length,totalComprador.length,list.data.length])
        
        let totalPorcentaje = list.data.length
        let porcentComprador = list.data.filter(data => data.type_user == 'Comprador')
        let porcentVendedor = list.data.filter(data => data.type_user == 'vendedor' || data.type_user == 'Vendedor')
       
        setPorcentajes([porcentaje(porcentVendedor.length,totalPorcentaje),porcentaje(porcentComprador.length,totalPorcentaje)])
        debugger
    })
  },[])


  const renderPrincipalComponent = ()=>{
    let componente;
  switch(props.pestaña){
    case 'PestUsuario': 
    componente = <PestUsuario valorTotales = {valoresTotales} porcentajes = {porcentajes}/>
    break;
    case 'PestListadoUser': componente = <PestListadoUsuarios typeUser = {infoTipoUser} infoTarjetaTitulos = {infoTarjetaTitulos} infoTarjetaDescripcion ={infoTarjetaDescripcion} listUser={listUser}/>
    break;
  }
  debugger
    return componente
  }

 
  
  return (
    <div className="contenedor-tablero">
      <div className="contendor-pestaña">
        {
          nombreEtiquetas.map((nombre, i) => {
            return <PestañasTablero
            nombreEtiqueta={nombre}
            ruta = {rutas[i]}
            key ={i}
          />
          })
        }
      </div>
      {
        renderPrincipalComponent()
      }
    </div>
  );
}

export default TableroUsuario;