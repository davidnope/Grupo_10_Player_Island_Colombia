const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
console.log(productosJSON)

const partesFormulario = {
    marca: ['PlayStation', 'Xbox', 'Nintendo'],
    categoria: ['Controles', 'Consolas', 'Accesorios'],
    metodosPago: ['PSE', 'VISA','MASTERCARD', 'AMERICAN EXPRESS', 'DAVIVIENDA', 'BANCOLOMBIA'],
    color: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Otro']
}   

const controller={
    productos: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productos.ejs'), {productosJSON, toThousand} )
    },

    detalle: (req, res) =>{
        let id = req.params.id - 1;
        let producto = productosJSON[id];
        res.render(path.resolve(__dirname, '../views/detalle-producto.ejs'), {producto, toThousand })
    },
    agregar: (req, res) =>{   
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'), {partesFormulario})
    },

    editar: (req, res) => {
        res.render(path.resolve(__dirname, '../views/editar-producto.ejs'), {partesFormulario})
    }
}

module.exports = controller;