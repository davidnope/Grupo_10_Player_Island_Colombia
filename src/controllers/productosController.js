/* https://sebhastian.com/sequelize-belongstomany/ */
const { compareSync } = require('bcryptjs');
const { log } = require('console');
const { redirect, json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const { features } = require('process');
const { Recoverable } = require('repl');

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// modelos
const db = require('../database/models')
let productos = db.Product
let colors = db.Color

const partesFormulario = {
    marca: ['PlayStation', 'Xbox', 'Nintendo'],
    categoria: ['Controles', 'Consolas', 'Accesorios'],
    metodosPago: ['PSE', 'VISA','MASTERCARD', 'AMERICAN EXPRESS', 'DAVIVIENDA', 'BANCOLOMBIA'],
    color: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Otro']
}   

const controller={
    productos: (req, res) => {
        
        productos.findAll()
        .then(products=>{
                
        let contador=0;
        for(let i=0;i<products.length;i++){
            products[i].deleted==1? contador++:null;
        }
        let total = products.length-contador;
        console.log('total '+ total)

        res.render(path.resolve(__dirname, '../views/productos.ejs'), {productosJSON : products, toThousand, total} )
        })
        
    },

    detalle: (req, res) =>{
        let id = req.params.id - 1;
        let producto = productosJSON[id];
        let descuento = producto.price*(producto.discount/100)
        let precioReal = producto.price-descuento
        let tipo = req.session.usuarioLogueado ? req.session.usuarioLogueado.type_user : null;     

        res.render(path.resolve(__dirname, '../views/detalle-producto.ejs'), {producto, toThousand , precioReal, tipo})
    },
    agregar: (req, res) =>{   
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'), {partesFormulario})
    },
    store: (req,res) => {
        
        productos.create({
            name: req.body.name,
            description: req.body.description,
            features: req.body.features,
            company: req.body.company,
            category: req.body.category, 
            price: req.body.price,
            discount: req.body.discount,
            rating: 5,
            stock: req.body.stock,
            user_id: 2,
            deleted: 0,
            // colors: [
            //     {color: 'Negro'},
            //     {color: 'Rojo'}
            //     // {id: 2}
            // ]            
        }
        // , {include: 'colors'}
        )
        .then(creado=>{
            let identificadoresDeColores = [1, 2, 3]
            identificadoresDeColores.forEach(item => {
                // 2. Find the Classes row
                colors.findByPk(item)
                .then(colorAdquirido =>{
                    // 3. INSERT the association in Enrollments table
                    creado.addColor(colorAdquirido, { through: 'colors' });
                })
                
            });

        })
    },

    editar: (req, res) => {
        let id = req.params.id - 1;
        let producto = productosJSON[id];
        res.render(path.resolve(__dirname, '../views/editar-producto.ejs'), {producto,toThousand, partesFormulario})
    },
    guardarEdicion: (req,res) => {
        
        productosJSON[req.params.id-1].name=req.body.name;
        productosJSON[req.params.id-1].price=Number(req.body.price);
        productosJSON[req.params.id-1].discount=Number(req.body.discount);
        productosJSON[req.params.id-1].category=req.body.category; 
        productosJSON[req.params.id-1].description=req.body.description;

        let escritura = JSON.stringify(productosJSON, null, 2);

        fs.writeFileSync(path.join(__dirname, '../data/dbProductos.json'), escritura);
        
        res.redirect('/productos/detalle-producto/'+req.params.id);
    },
    
    eliminar: (req,res) => {
        let id = req.params.id - 1;
        let producto = productosJSON[id];
        res.render(path.resolve(__dirname, '../views/delete-producto.ejs'), {producto,toThousand})
    },
    guardarEliminar:(req,res)=>{
        productosJSON[req.params.id-1].delete=true;
        let escritura = JSON.stringify(productosJSON, null, 2);

        fs.writeFileSync(path.join(__dirname, '../data/dbProductos.json'), escritura);
        res.redirect('/productos');
    }

}

module.exports = controller;