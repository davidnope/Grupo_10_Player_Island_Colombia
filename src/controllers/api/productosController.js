const db = require('../../database/models');

let productos = db.Product
const imgProductos = db.ImgProduct

const controller = {
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
            console.log(req.body.imgBorradas[i]) 
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