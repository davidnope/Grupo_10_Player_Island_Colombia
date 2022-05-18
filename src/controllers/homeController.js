const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/dbProductos.json');
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller={
    home: (req, res) => {
        let ids=[]
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
        }
        console.log(ids)
        res.render(path.resolve(__dirname, '../views/home.ejs'), {productosJSON, toThousand,ids})
    },
}
module.exports = controller;

