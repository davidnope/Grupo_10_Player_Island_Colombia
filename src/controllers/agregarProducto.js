const path = require('path');

const controller = {
    agregarProducto : (req, res) =>{
        
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'))
    },
}

module.exports = controller;