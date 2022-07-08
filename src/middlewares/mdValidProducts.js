const {body} = require('express-validator');
const path = require('path');

const validacionProducto =[
    body('name').notEmpty().withMessage('Escriba el nombre del producto'),
    body('price').notEmpty().withMessage('Escriba un precio para su producto'),
    body('stock').notEmpty().withMessage('Escriba la cantidad de productos a vender'),
    body('description').notEmpty().withMessage('Describa su producto'),
    /* body('img').notEmpty().withMessage('Agrege almenos una imagen'), */
    
    body('img').custom((value, {req})=>{

        let files = req.files;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        

        if(files){
           
            for (let i = 0; i < files.length; i++) {
                
                let fileExtension = path.extname(files[i].originalname);

                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error (`Las extensiones de archvio permitidos son ${acceptedExtensions.join(', ')}`);
                }
                
            }
        }
        return true;
    }),

    body('price').custom((value, {req})=>{
        let price= req.body.price
        if (price <= 0) {
            throw new Error (`el precio no puede ser ${price}`)
        }
        return true;
    }),
    body('stock').custom((value, {req})=>{
        let stock= req.body.stock
        if (stock <= 0) {
            throw new Error (`el stock no puede ser ${stock}`)
        }
        return true;
    })
  
]

module.exports = validacionProducto;