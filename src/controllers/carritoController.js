
const { redirect } = require("express/lib/response");
const path = require("path");
const db = require('../database/models');
const Op = db.Sequelize.Op;

let productos = db.Product
let carrito = db.ShoppingCart
let usuario = db.User

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

console.log(carrito);

const controller = {

    carrito: (req, res) => {

        carrito.findOne({ where: { user_id: req.query.u } })
            .then(result => {
                result.getProducts()
                    .then(productos => {
                        let total = 0
                        productos.forEach(element => {
                            total += element.price
                        });
                        let variable = [result, productos]
                        console.log(productos);
                        /* res.json(variable) */
                        usuario.findByPk(req.query.u)
                        .then( user => {
                            res.render(path.resolve(__dirname, '../views/carrito.ejs'), { productos , toThousand, total , user ,result})
                        })
                    })


            })


        /* res.render(path.resolve(__dirname, '../views/carrito.ejs')) */
    },
    agregarProducto: async (req, res) => {
        let variable = [req.body, req.query] 

        /* res.json(carrito) */
        let carrito1 = await carrito.findOne({ where: { user_id: req.query.u } }, { include: [{ association: 'products' }] })
        let producto = await productos.findOne({ where: { id: req.query.p } })
        let mostrar = [carrito1, producto]
        carrito1.addProduct(producto)
        res.redirect('/productos')
    }
}
module.exports = controller;