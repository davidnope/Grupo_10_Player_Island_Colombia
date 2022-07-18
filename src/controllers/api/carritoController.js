
const db = require('../../database/models');
const Op = db.Sequelize.Op;

let productos = db.Product
let carrito = db.ShoppingCart
let usuario = db.User

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

console.log(carrito);

const controller = {
    cantidad: async (req,res) => {
        let cart = await carrito.findOne({ where: { user_id: req.query.u } }, { include: [{ association: 'products' }] })
        let respuesta = await cart.getProducts()
        res.json(respuesta.length) 
    },

    
    eliminarProducto: async (req,res) => {
        console.log('linea 53 carrito de compras')
        console.log('entre al eliminarProducto');
        let cart = await carrito.findOne({ where: { user_id: req.query.u } }, { include: [{ association: 'products' }] })
        let respuesta = await cart.getProducts()
        let productosBuenos = respuesta.filter((producto,i)=>{
            return i != req.query.p
        })
        await cart.setProducts([])
        await cart.addProducts(productosBuenos)
        let nuevaLista = await cart.getProducts()
        await res.json(nuevaLista) 
        
        
    }
}
module.exports = controller;