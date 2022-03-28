const  path  = require("path");



const controller={
    detalle: (req, res) => {
        res.render(path.resolve(__dirname, '../views/detalle-producto.ejs'))
    },
}
module.exports = controller;