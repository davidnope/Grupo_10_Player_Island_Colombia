const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

const port = process.env.PORT || 3030;

app.listen(port, () => console.log('Corriendo servidor'))

// Middlewares

// CARPETA PUBLICA
app.use(express.static(path.resolve(__dirname, '../public')))

// RECIBIR FORMULARIOS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CRUD - PUT Y DELETE
app.use(methodOverride('_method'));

// Datos session - información generar para el servidor
app.use(session({secret: "Nuestro mensaje secreto"}));

// CONFIGURACION EJS
app.set('view engine', 'ejs');


// RUTAS
const homeRouter = require(path.join(__dirname, 'routers/home'))
const carritoRouter = require(path.join(__dirname, 'routers/carrito-compras'))
const registerRouter = require(path.join(__dirname, 'routers/users'))
const productosRouter = require(path.join(__dirname, 'routers/productos'))




app.use('/', homeRouter)
app.use('/carrito-compras', carritoRouter)
app.use('/user' , registerRouter)
app.use('/productos' , productosRouter)

