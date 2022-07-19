const express = require("express");
const  path  = require("path");
const multer = require('multer');
const router = express.Router();
const productosController = require(path.join(__dirname, '../controllers/productosController'));


// MIDDLEWARES
const validacionProductos = require(path.join(__dirname, '../middlewares/mdValidProducts'));

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let carpetasProductos = ['../../public/img/productos', '../../dashboard-player-island-colombia/src/img/productos'];
        for (let i = 0; i < carpetasProductos.length; i++) {
            cb(null, path.join(__dirname, carpetasProductos[i]));
        }
    },
    filename: (req,file,cb)=>{
        
        cb(null, `${req.body.name.split(' ').join('_')}_img__${req.body.category}_${Date.now()}${path.extname(file.originalname)}`);

    }
});
const uploadFile = multer({storage});



router.get('/', productosController.productos);

router.get('/results', productosController.search)


router.get('/agregar', productosController.agregar);
router.post('/agregar', uploadFile.any('img'), validacionProductos, productosController.store )

router.get('/editar', productosController.editar);
router.put('/editar', uploadFile.any('img'), validacionProductos , productosController.guardarEdicion )

router.get('/eliminar/:id', productosController.eliminar);
router.delete('/eliminar/:id', productosController.guardarEliminar )


router.get('/detalle-producto/:id', productosController.detalle);

router.get('/listProductsUser/:id', productosController.list)

router.get('/compra', productosController.compra)

module.exports = router; 