const path = require('path');

const partesFormulario = {
    marca: ['PlayStation', 'Xbox', 'Nintendo'],
    categoria: ['Controles', 'Consolas', 'Accesorios'],
    metodosPago: ['PSE', 'VISA','MASTERCARD', 'AMERICAN EXPRESS', 'DAVIVIENDA', 'BANCOLOMBIA'],
    color: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Otro']
}   

const controller = {
    agregarProducto : (req, res) =>{
        
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'), {partesFormulario})
    },
}

module.exports = controller;