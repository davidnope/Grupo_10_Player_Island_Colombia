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
        if(!files[0]){
            throw new Error (`Agrege almenos una imagen`);  
        }

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
  
]

module.exports = validacionProducto;