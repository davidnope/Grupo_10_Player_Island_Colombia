import React from "react";
import '../tableros.css';

// COMPONENTES
import PestañasTablero from '../pestañas/PestañasTablero'
import PestProductos from './pestañasProductos/PestProductos';
import PestUltimoProductos from './pestañasProductos/PestUltimoProductos';
import PestListadoProductos from './pestañasProductos/PestListadoProductos';

import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

let porcentaje = (dato,total)=>{
  return ((dato*100)/total).toFixed(1)
 
}


// Info etiquetas
let nombreEtiquetas = ['Productos', 'Ultimo', 'Listado'];
let rutas = ['/Productos/PestProductos', '/Productos/PestUltimo', '/Productos/PestListProducts']

// Info etiquetas

// Info productos - infoTarjetaDescripcion


function TableroProducto(props) {

  const {id} = useParams()
      console.log(id);
  const [infoNombreProducto, setInfoTipoUser] = useState(['Id-Nombre producto'])
  const [infoTarjetaDescripcion, setInfoTarjetaDescripcion] = useState()
  const [listProductos, setListProductos] = useState([])
  const [listUsuarios, setListUsuarios] = useState([])
  const [valoresTotales,setValoresTotales] = useState([])
  const [porcentajes,setPorcentajes] = useState([])
  const [renderComponent,setRenderComponent] = useState(null)


  // ultimoProducto
  const [ultimoProducto, setUltimoProducto] = useState([])
  /* const [idProducto, setIdProducto] = useState([]) */
  useEffect((req,res)=>{
   /*  console.log(req.query) */
     let promesas = []
     promesas.push(fetch('http://localhost:3030/api/user/list').then(result => result.json()))
     promesas.push(fetch('http://localhost:3030/api/productos/list').then(result => result.json()))
    
     Promise.all(promesas)
     .then(lists =>{
      let listUsuarios = lists[0].data
      let listProductos = lists[1]
      
     /*  for (let i = 0; i < listProductos.length; i++) {
       
        
      } */
      setListUsuarios(listUsuarios)
      setListProductos(listProductos)
      setValoresTotales ( [500,listProductos.length])
      setUltimoProducto(listProductos[(listProductos.length)-1])

      
        let totalPorcentaje = listProductos.length
        let xbox = listProductos.filter(data => data.company == 'xbox')
        let playstation = listProductos.filter(data => data.company == 'playstation')
        let nintendo = listProductos.filter(data => data.company == 'nintendo')

        let consolas = listProductos.filter(data => data.category == 'consola')
        let controles = listProductos.filter(data => data.category == 'control')
        let especiales = listProductos.filter(data => data.category == 'edicion-especial')
        let accesorios = listProductos.filter(data => data.category == 'accesorios')
       
        setPorcentajes([
          [porcentaje(xbox.length,totalPorcentaje),porcentaje(playstation.length,totalPorcentaje),porcentaje(nintendo.length,totalPorcentaje)],
          [porcentaje(consolas.length,totalPorcentaje),porcentaje(controles.length,totalPorcentaje),porcentaje(especiales.length,totalPorcentaje),porcentaje(accesorios.length,totalPorcentaje)]
        ])
        
     })
  },[])

  
  const renderPrincipalComponent = ()=>{
    let componente
    switch(props.pestaña){
      case 'PestProductos': componente =  <PestProductos valorTotales = {valoresTotales} porcentajes = {porcentajes}/>
      break;
      case 'PestUltimo': componente = <PestUltimoProductos ultimoProducto = {ultimoProducto}/>
      break;
      case 'PestListProducts': componente = <PestListadoProductos  infoNombreProducto = {infoNombreProducto}  infoTarjetaDescripcion ={infoTarjetaDescripcion} listProductos={listProductos} listUsuarios={listUsuarios}/>
      break;
    }
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
              key={i}
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

export default TableroProducto;