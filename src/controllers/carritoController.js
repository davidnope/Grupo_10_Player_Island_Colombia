
const  path  = require("path");



const controller={
    carrito: (req, res) => {
        res.render(path.resolve(__dirname, '../views/carrito.ejs'))
    },
}
module.exports = controller;