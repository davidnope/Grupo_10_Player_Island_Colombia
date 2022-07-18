const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require ( 'cookie-parser' );

const path = require('path');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



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


// APIS
const apicarrito = require(path.join(__dirname, 'routers/api/carrito-compras'))
app.use('/api/carrito-compras', apicarrito)
const apiUser = require(path.join(__dirname, 'routers/api/user'))
app.use('/api/user', apiUser)
const apiProductos = require(path.join(__dirname, 'routers/api/producto'))
app.use('/api/productos', apiProductos)




app.use('/', homeRouter)
app.use('/carrito-compras', carritoRouter)
app.use('/user' , registerRouter)
app.use('/productos' , productosRouter)

