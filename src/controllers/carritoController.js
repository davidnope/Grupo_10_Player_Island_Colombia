
const { redirect } = require("express/lib/response");
const  path  = require("path");
const db = require('../database/models');
const Op = db.Sequelize.Op;

let productos = db.Product
let carrito = db.ShoppingCart 

console.log(carrito);

const controller={
    
    carrito: (req, res) => {

        carrito.findAll()
        .then(result=>{
            console.log(result);
            res.json(result)
        })

        
        /* res.render(path.resolve(__dirname, '../views/carrito.ejs')) */
    },
    agregarProducto: async (req, res) => {
        let variable =[ req.body , req.query ]

        /* res.json(carrito) */
        let carrito1 =  await carrito.findOne({where : { user_id : req.query.u}}, {include : [{ association: 'products' }]}) 
        let producto =  await productos.findOne({where : {id : req.query.p}})
        let mostrar  = [ carrito1, producto]
        carrito1.addProduct(producto)
        res.redirect('/productos')
    }
}
module.exports = controller;