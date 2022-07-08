/* https://sebhastian.com/sequelize-belongstomany/ */
const { compareSync } = require('bcryptjs');
const { log, Console } = require('console');
const { redirect, json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const { features } = require('process');
const { Recoverable } = require('repl');

// VALIDACIONES
const { validationResult } = require('express-validator');
// FUNCION VALIDAR ERRORES
let rutaRedirect;
const formValidator = (req, res) => {
    let result = {
        valid: true
    };

    let errorsValidation = validationResult(req);

    if (errorsValidation.errors.length > 0) {
        let idUser = req.query.u
        result.valid = false;
        res.render(rutaRedirect, {
            errores: errorsValidation.mapped(), old: req.body, idUser 
        });
    }
    
    return result;
};
const formValidatorEdicion = (req, res , id) => {
    let result = {
        valid: true
    };

    let errorsValidation = validationResult(req);

    if (errorsValidation.errors.length > 0) {
        result.valid = false;
        productos.findByPk(req.query.p, { include: [{ association: 'imgProducts' }] })
            .then(producto => {
                let descuento = producto.price * (producto.discount / 100)
                let precioReal = producto.price - descuento
                let tipo = req.session.usuarioLogueado ? req.session.usuarioLogueado.type_user : null;
                let idUser = req.query.u

                /* res.json(producto) */
                res.render(path.resolve(__dirname, '../views/editar-producto.ejs'), { producto, toThousand, precioReal, tipo, errores: errorsValidation.mapped(), old: req.body ,idUser})
            })
        
        
    }
    return result;
};

// FUNCION VALIDAR ERRORES - CERRAR
// modelos
const db = require('../database/models')
const productos = db.Product
const colors = db.Color
const imgProductos = db.ImgProduct
const Op = db.Sequelize.Op

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




//constantes
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const imagenDefault = 'default.png'
function cantImg(producto) {
    let contador = 0
    for (let i = 0; i < producto.imgProducts.length; i++) {
        !(producto.imgProducts[i].deleted) ? contador++ : '';
    }
    return contador
}


function imagenesExistentes(producto) {
    let ids = [];
    for (let i = 0; i < producto.imgProducts.length; i++) {
        !(producto.imgProducts[i].deleted) ? ids.push(producto.imgProducts[i].id) : '';
    }
    console.log(ids);
    return ids
}




const partesFormulario = {
    marca: ['PlayStation', 'Xbox', 'Nintendo'],
    categoria: ['Controles', 'Consolas', 'Accesorios'],
    metodosPago: ['PSE', 'VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'DAVIVIENDA', 'BANCOLOMBIA'],
    color: ['Negro', 'Blanco', 'Rojo', 'Azul', 'Gris', 'Otro']
}

const controller = {
    productos: (req, res) => {

        productos.findAll({
            include: [{ association: 'imgProducts' }],
            where: { deleted: 0 }
        })
            .then(products => {
                /* console.log('linea 64',products[17].img_principal) */



                let contador = [];
                for (let i = 0; i < products.length; i++) {
                    products[i].deleted == 1 ? contador.push(products[i].id) : null;
                }
                let total = products.length
                console.log('total ' + total)
                /* console.log(products) */
                /* console.log(products[0].img_principal) */


                res.render(path.resolve(__dirname, '../views/productos.ejs'), { productos: products, toThousand, total })


            })

    },

    detalle: (req, res) => {
        /* let id = req.params.id - 1;
        let producto = productosJSON[id]; */
        productos.findByPk(req.params.id, { include: [{ association: 'imgProducts' }] })
            .then(producto => {
                let descuento = producto.price * (producto.discount / 100)
                let precioReal = producto.price - descuento
                let tipo = req.session.usuarioLogueado ? req.session.usuarioLogueado.type_user : null;
                let cantidad = cantImg(producto)
                let ids = imagenesExistentes(producto)
                imgProductos.findAll({ where: { id: ids } })
                    .then(resp => {
                        productos.findAll({
                            where: { deleted: 0 }
                        }).then(productos => {

                            res.render(path.resolve(__dirname, '../views/detalle-producto.ejs'), { producto, toThousand, precioReal, tipo, imagenDefault, cantidad, ids, resp, productos })
                        }

                        )
                    })
                /* res.json(producto) */
            })
    },
    agregar: (req, res) => {
        let idUser = req.query.u
        console.log(idUser , '/////////////////////////////////////////////');
        res.render(path.resolve(__dirname, '../views/agregar-producto.ejs'), { partesFormulario , idUser })
    },
    store: (req, res) => {

        rutaRedirect = path.join(__dirname, '../views/agregar-producto.ejs');

        if (formValidator(req, res).valid) {
            let imagen

            req.body.imagenPrincipal ? (req.body.imagenPrincipal[3] ? imagen = req.body.imagenPrincipal[3] : '') : '';
            console.log(imagen);
            console.log('el files', req.body.imagenPrincipal, req.files[imagen])

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
                user_id: req.query.u,
                deleted: 0,
                // colors: [
                //     {color: 'Negro'},
                //     {color: 'Rojo'}
                //     // {id: 2}
                // ]            
            }
                // , {include: 'colors'}
            ).then(creado => {
                let identificadoresDeColores = [10, 11, 12]
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
                let imagenes = [];
                //iteramos el files
                for (let i = 0; i < req.files.length; i++) {

                    //creamos promesa donde se guarda uno por uno el filename de cada imagen
                    let promesa = imgProductos.create({
                        name: req.files[i].filename,
                        product_id: creado.id,
                        deleted: 0
                    }).then(creada => {
                        console.log('linea 160', `id producto ${creado.id} ... id imagen ${creada.id} imagen escojida  ${imagen} direccion ${req.files[imagen].filename}`);

                        imagenes.push(creada.id)
                        let promesa2 = productos.update({
                            img_principal: req.files[imagen].filename
                        }, {
                            where: { id: creado.id }
                        }).then(result => {
                            console.log('siiiiiiii la imagennn se guardooooo', result, imagenes[imagen])
                        }
                        )
                        arrayImages.push(promesa2)

                    })

                    //guardamos la promesa creada en el array
                    arrayImages.push(promesa)




                }
                // realizamos las promesas de la creacion de imagenes

                Promise.all(arrayImages)
                    .then(response => res.redirect('/productos'))

            })
        }

        /* res.sendFile(req.files[imagen].path) */
    },

    editar: (req, res) => {

        productos.findByPk(req.query.p, { include: [{ association: 'imgProducts' }] })
            .then(producto => {
                let descuento = producto.price * (producto.discount / 100)
                let precioReal = producto.price - descuento
                let tipo = req.session.usuarioLogueado ? req.session.usuarioLogueado.type_user : null;


                /* res.json(producto) */
                res.render(path.resolve(__dirname, '../views/editar-producto.ejs'), { producto, toThousand, precioReal, tipo , idProducto:req.query.p , idUser: req.query.u })
            })

    },
    guardarEdicion: (req, res) => {

        rutaRedirect = path.join(__dirname, '../views/editar-producto.ejs');

        if (formValidatorEdicion(req, res, req.params.id).valid) {

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
                id_user: req.query.u
            }, {
                where: { id: req.query.p }
            }).then(resultado => {
                console.log(resultado);
                let arrayImages = [];
                //iteramos el files
                for (let i = 0; i < req.files.length; i++) {
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

                Promise.all(arrayImages).then(response => res.redirect('/productos/detalle-producto/' + req.query.p))

            })
        }
    },

    eliminar: (req, res) => {
        productos.findByPk(req.params.id, { include: [{ association: 'imgProducts' }] })
            .then(producto => {
                res.render(path.resolve(__dirname, '../views/delete-producto.ejs'), { producto, toThousand })
            })


    },
    guardarEliminar: (req, res) => {
        productos.update({
            deleted: 1,
        }, {
            where: { id: req.params.id }
        }
        ).then(
            res.redirect('/productos'));
    },
    list: (req, res) => {
        productos.findAll({
            where: {
                user_id: req.params.id,
                deleted: 0
            },
        }).then(productos => {
            let idUser = req.params.id;
            res.render(path.join(__dirname, '../views/list-products.ejs'), { products: productos, idUser })
        })
    },
    search: (req, res) => {
        /* console.log(req.query.search_query); */
        if(req.query.search_query){
            productos.findAll({
            where: {
                deleted: 0,
                name: { [Op.like]: `%${req.query.search_query}%` }
            }
        }).then(products => {


                let contador = [];
                for (let i = 0; i < products.length; i++) {
                    products[i].deleted == 1 ? contador.push(products[i].id) : null;
                }
                let total = products.length
                console.log('total ' + total)
                /* console.log(products)
                console.log(ids) */
            

                        res.render(path.resolve(__dirname, '../views/productos.ejs'), { productos: products, toThousand, total })

                    



            })
        }else if(req.query.company){
            productos.findAll({
                where: {
                    deleted: 0,
                    company: { [Op.like]: `%${req.query.company}%` }
                }
            }).then(products => {
    
    
                    let contador = [];
                    for (let i = 0; i < products.length; i++) {
                        products[i].deleted == 1 ? contador.push(products[i].id) : null;
                    }
                    let total = products.length
                    console.log('total ' + total)
                    /* console.log(products)
                    console.log(ids) */
                
    
                            res.render(path.resolve(__dirname, '../views/productos.ejs'), { productos: products, toThousand, total })
    
                        
    
    
    
                })
        }else if (req.query.ct){
           let filtros = req.query.ct.split(' ')
            
           
            productos.findAll({
                where: {
                    deleted: 0,
                    category: filtros
                }
            }).then(products => {
    
    
                    let contador = [];
                    for (let i = 0; i < products.length; i++) {
                        products[i].deleted == 1 ? contador.push(products[i].id) : null;
                    }
                    let total = products.length
                    console.log('total ' + total)
                    /* console.log(products)
                    console.log(ids) */
                
    
                            res.render(path.resolve(__dirname, '../views/productos.ejs'), { productos: products, toThousand, total })
    
                        
    
    
    
                })
        }else if(req.query.pr){
            
            let intervalos = [
                    [0 , 200000],
                    [201000 , 800000],
                    [801000 , 1500000],
                    [1500001 , 9999999999999999999999999999 ]
                    
            ]
            let intervalo = req.query.pr == 200000 ? intervalos[0]: req.query.pr == 800000 ? intervalos[1]: req.query.pr == 1500000 ? intervalos[2]: req.query.pr == 'mayor' ? intervalos[3]: null ; ; ; ;
            productos.findAll({
                where: {
                    deleted: 0,
                    price:  { [Op.between]: intervalo }
                }
            }).then(products => {
    
    
                    let contador = [];
                    for (let i = 0; i < products.length; i++) {
                        products[i].deleted == 1 ? contador.push(products[i].id) : null;
                    }
                    let total = products.length
                    console.log('total ' + total)
                    /* console.log(products)
                    console.log(ids) */
                
    
                            res.render(path.resolve(__dirname, '../views/productos.ejs'), { productos: products, toThousand, total })
    
                        
    
    
    
                })
        }
    }
}

module.exports = controller;