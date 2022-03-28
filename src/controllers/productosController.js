const  path  = require("path");



const controller={
    productos: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productos.ejs'))
    },
}
module.exports = controller;