const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3030;

app.use(express.static(path.resolve(__dirname, '../public')))
app.listen(port, () => console.log('Corriendo servidor'))
app.set('view engine', 'ejs');



const homeRouter = require(path.join(__dirname, 'routers/home'))
const detalleRouter = require(path.join(__dirname, 'routers/detalle-producto'))
const carritoRouter = require(path.join(__dirname, 'routers/carrito-compras'))
const loginRouter = require(path.join(__dirname, 'routers/login'))
const registerRouter = require(path.join(__dirname, 'routers/register'))
const productosRouter = require(path.join(__dirname, 'routers/productos'))

const agregarProductoRouter = require(path.join(__dirname, 'routers/agregar-producto'));




app.use('/', homeRouter)
app.use('/detalle-producto', detalleRouter)
app.use('/carrito-compras', carritoRouter)
app.use('/login', loginRouter)
app.use('/register' , registerRouter)
app.use('/productos' , productosRouter)
app.use('/agregar-producto' , agregarProductoRouter)

