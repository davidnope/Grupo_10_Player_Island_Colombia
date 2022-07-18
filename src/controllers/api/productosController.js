const db = require('../../database/models');
const Op = db.Sequelize.Op;

let productos = db.Product
const imgProductos = db.ImgProduct

const controller = {
    list:(req, res)=>{
        //GET http://localhost:3030/api/productos/searchAll
        productos.findAll({
            where:{
                deleted: 0
            }
             
            // where:{
            //     name: {[Op.like]: `%${req.params.search}%`}
            // }
        })
        .then(listado => {
            
           
            
            res.json(listado);
         })
         .catch(err =>{
             res.json('no se encontro')
         })
    },
    searchAll: (req, res)=>{
        //GET http://localhost:3030/api/productos/searchAll
        productos.findAll({
            where:{
                deleted: 0
            }
             
            // where:{
            //     name: {[Op.like]: `%${req.params.search}%`}
            // }
        })
        .then(listado => {
            
            let array = []
            for(let i = 0; i < listado.length; i++){
                array.push(listado[i].name)
            }
            
            res.json(array);
         })
         .catch(err =>{
             res.json('no se encontro')
         })
    },
    searchOne: (req, res) => {
        //GET http://localhost:3030/api/user/list
        
        
        productos.findByPk(req.params.id,{include:[{association: 'imgProducts'}]})
            .then(listado => {
                
               res.json(listado)
            })
            .catch(err =>{
                res.json('no se encontro')
            })
    },
    update: (req, res) => {
        //GET http://localhost:3030/api/user/list
        console.log(req.body)
        console.log('entre al update');

        let arrayPromesas = []

        for(let i=0; i<req.body.imgBorradas.length ;i++)    {
            
            let promesa = imgProductos.update({
                    deleted : 1
                },{
                    where:{ id : req.body.imgBorradas[i] }
                })
                

            arrayPromesas.push(promesa)

        }

        Promise.all(arrayPromesas).then(console.log('lo logramos'))
        
    }
}

module.exports = controller;