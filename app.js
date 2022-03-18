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

app.listen(port, () => console.log('Corriendo servidor'))