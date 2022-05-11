const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require ( 'cookie-parser' );

const path = require('path');
const app = express();

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`|| SERVIDOR FUNCIONANDO PUERTO: ${port} ||`))

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

// instalar paquete cookie-parser y crusarlo con toda la aplicaicon
app.use(cookieParser());

// middlewares Cookies
const mdRecordarUser = require(path.join(__dirname,'./middlewares/mdRecordarUser'));
app.use(mdRecordarUser);


// RUTAS
const homeRouter = require(path.join(__dirname, 'routers/home'))
const carritoRouter = require(path.join(__dirname, 'routers/carrito-compras'))
const registerRouter = require(path.join(__dirname, 'routers/users'))
const productosRouter = require(path.join(__dirname, 'routers/productos'))




app.use('/', homeRouter)
app.use('/carrito-compras', carritoRouter)
app.use('/user' , registerRouter)
app.use('/productos' , productosRouter)

