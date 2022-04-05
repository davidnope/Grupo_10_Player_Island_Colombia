const  path  = require("path");

const partesFormulario = {
    marca: ['PlayStation', 'Xbox', 'Nintendo'],
    categoria: ['Controles', 'Consolas', 'Accesorios'],
    metodosPago: ['PSE', 'VISA','MASTERCARD', 'AMERICAN EXPRESS', 'DAVIVIENDA', 'BANCOLOMBIA'],
    color: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Otro']
}   

const controller={
    productos: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productos.ejs'))
    },

    detalle: (req, res) =>{
        res.render(path.resolve(__dirname, '../views/detalle-producto.ejs'))
    },
    agregar: (req, res) =>{   
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'), {partesFormulario})
    },

    editar: (req, res) => {
        res.render(path.resolve(__dirname, '../views/editar-producto.ejs'), {partesFormulario})
    }
}

module.exports = controller;