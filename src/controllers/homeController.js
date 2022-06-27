const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models')
const productos = db.Product
const colors = db.Color
const imgProductos = db.ImgProduct

const controller={
    home: (req, res) => {
        /* let ids=[]
        for(let i=0;i<productosJSON.length;i++){
            if((!productosJSON[i].delete)&&productosJSON[i].discount>9){
                ids.push(productosJSON[i].id)
            }
        }
        if(ids.length<4){
            for(let i=0;i<productosJSON.length;i++){
                if((!productosJSON[i].delete)&&productosJSON[i].discount>4&&!(ids.includes(productosJSON[i].id))){
                    ids.push(productosJSON[i].id)
                }
            }   
        }
        if(ids.length<4){
            for(let i=0;i<productosJSON.length;i++){
                if((!productosJSON[i].delete)&&productosJSON[i].discount>=0&&!(ids.includes(productosJSON[i].id))){
                    ids.push(productosJSON[i].id)
                }
            }   
        } */
        let usuarioLogueado = req.session.usuarioLogueado ? req.session.usuarioLogueado : null;
        productos.findAll({
            include:[{association:'imgProducts'}] ,
            where: { deleted : 0}
    })
        .then(productos=>{
            console.log(productos[0]);
            res.render(path.resolve(__dirname, '../views/home.ejs'), {productos, toThousand, usuarioLogueado});
        })

        
        
    },
}
module.exports = controller;

