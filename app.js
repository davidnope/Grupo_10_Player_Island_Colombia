const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3030;

app.use(express.static(path.resolve(__dirname, './public')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
})

app.get('/detalle-producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/detalle-producto.html'))
})

app.get('/carrito-compras', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'))
})


app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get('/register' , (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
})

app.listen(port, () => console.log('Corriendo servidor'))