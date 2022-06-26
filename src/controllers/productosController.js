/* https://sebhastian.com/sequelize-belongstomany/ */
const { compareSync } = require('bcryptjs');
const { log, Console } = require('console');
const { redirect, json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const { features } = require('process');
const { Recoverable } = require('repl');

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//constantes
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const imagenDefault = 'default.png'
function cantImg(producto){
    let contador = 0
    for(let i = 0; i<producto.imgProducts.length; i++){
        !(producto.imgProducts[i].deleted) ? contador++ : '' ;
    }
    return contador
}
function imgPrincipal(producto){
    let id = 0
    for(let i = 0; i<producto.imgProducts.length; i++){
        if(!(producto.imgProducts[i].deleted)&& id == 0) { 
            id = producto.imgProducts[i].id } 
        }
    return id
}
function imagenesExistentes(producto){
    let ids = [];
    for(let i = 0; i<producto.imgProducts.length; i++){
        !(producto.imgProducts[i].deleted) ? ids.push(producto.imgProducts[i].id): '' ;
    }
    return ids
}

// modelos
const db = require('../database/models')
const productos = db.Product
const colors = db.Color
const imgProductos = db.ImgProduct



const partesFormulario = {
    marca: ['PlayStation', 'Xbox', 'Nintendo'],
    categoria: ['Controles', 'Consolas', 'Accesorios'],
    metodosPago: ['PSE', 'VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'DAVIVIENDA', 'BANCOLOMBIA'],
    color: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Otro']
}

const controller = {
    productos: (req, res) => {

        productos.findAll({
            include:[{association:'imgProducts'}] ,
            where: { deleted : 0}
        })
            .then(products => {
                let ids = []
                for (let i = 0; i < products.length; i++) {
                    if (!products[i].deleted){
                    ids.push(imgPrincipal(products[i]))
                    }
                }
                
                
                let contador = [];
                for (let i = 0; i < products.length; i++) {
                    products[i].deleted == 1 ? contador.push(products[i].id) : null;
                }
                let total = products.length 
                console.log('total ' + total)
                console.log(products)
                console.log(ids)
                imgProductos.findAll({where:{id:ids}})
                .then(resp=>{
                    console.log(resp[0].name);
                    res.render(path.resolve(__dirname, '../views/productos.ejs'), { productos: products, toThousand, total , resp})

            })


                
            })

    },

    detalle: (req, res) => {
        /* let id = req.params.id - 1;
        let producto = productosJSON[id]; */
        productos.findByPk(req.params.id, {include:[{association: 'imgProducts'}]})
        .then(producto=>{
            let descuento = producto.price * (producto.discount / 100)
            let precioReal = producto.price - descuento
            let tipo = req.session.usuarioLogueado ? req.session.usuarioLogueado.type_user : null;
            let cantidad = cantImg(producto)
            let ids = imagenesExistentes(producto)
            imgProductos.findAll({where:{id:ids}})
            .then(resp=>{
                res.render(path.resolve(__dirname, '../views/detalle-producto.ejs'), { producto, toThousand, precioReal, tipo , imagenDefault, cantidad , ids , resp})

            })
            /* res.json(producto) */
        })
    },
    agregar: (req, res) => {
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'), { partesFormulario })
    },
    store: (req, res) => {

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
            user_id: 12,
            deleted: 0,
            // colors: [
            //     {color: 'Negro'},
            //     {color: 'Rojo'}
            //     // {id: 2}
            // ]            
        }
            // , {include: 'colors'}
        ).then(creado => {
                let identificadoresDeColores = [10,11,12]
                identificadoresDeColores.forEach(item => {
                    // 2. Find the Classes row
                    colors.findByPk(item)
                        .then(colorAdquirido => {
                            // 3. INSERT the association in Enrollments table
                            creado.addColor(colorAdquirido, { through: 'colors' });
                        })
                });
                //insercion imagenes del producto
                //array para las promesas de la cantidad n de imagenes
                let arrayImages = [];
                //iteramos el files
                for(let i=0; i<req.files.length; i++){
                    //creamos promesa donde se guarda uno por uno el filename de cada imagen
                    let promesa = imgProductos.create({
                        name: req.files[i].filename,
                        product_id: creado.id,
                        deleted: 0
                    })

                    //guardamos la promesa creada en el array
                    arrayImages.push(promesa)


                }
                // realizamos las promesas de la creacion de imagenes

                Promise.all(arrayImages).then(response => res.redirect('/productos'))

            })
    },

    editar: (req, res) => {
        productos.findByPk(req.params.id, {include:[{association: 'imgProducts'}]})
        .then(producto=>{
            let descuento = producto.price * (producto.discount / 100)
            let precioReal = producto.price - descuento
            let tipo = req.session.usuarioLogueado ? req.session.usuarioLogueado.type_user : null;
    
            /* res.json(producto) */
            res.render(path.resolve(__dirname, '../views/editar-producto.ejs'), { producto, toThousand, precioReal, tipo })
        })
        
    },
    guardarEdicion: (req, res) => {
       
        productos.update({
            name: req.body.name,
            description: req.body.description,
            features: req.body.features,
            company: req.body.company,
            category: req.body.category,
            price: req.body.price,
            discount: req.body.discount,
            rating: 5,
            stock: req.body.stock,
            deleted: 0,
        },{
            where:{id: req.params.id}
        }).then(resultado=>{
            console.log(resultado);
            let arrayImages = [];
                //iteramos el files
                for(let i=0; i<req.files.length; i++){
                    //creamos promesa donde se guarda uno por uno el filename de cada imagen
                    let promesa = imgProductos.create({
                        name: req.files[i].filename,
                        product_id: req.params.id,
                        deleted: 0
                    })

                    //guardamos la promesa creada en el array
                    arrayImages.push(promesa)


                }
                // realizamos las promesas de la creacion de imagenes

                Promise.all(arrayImages).then(response =>  res.redirect('/productos/detalle-producto/'+ req.params.id))
           
        })
    },

    eliminar: (req, res) => {
        productos.findByPk(req.params.id, {include:[{association: 'imgProducts'}]})
        .then(producto=>{
            res.render(path.resolve(__dirname, '../views/delete-producto.ejs'), { producto, toThousand })
        })
       
        
    },
    guardarEliminar: (req, res) => {
        productos.update({
            deleted: 1,
        },{
            where:{id: req.params.id}
        }
        ).then(
        res.redirect('/productos'));
    },
    list: (req, res) =>{
        productos.findAll({
            where: {
                user_id: req.params.id,
            },
        }).then(productos=>{
            res.render(path.join(__dirname, '../views/list-products.ejs'), {products: productos})
        })
    }
}

module.exports = controller;