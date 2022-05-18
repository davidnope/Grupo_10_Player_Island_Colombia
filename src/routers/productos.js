const express = require("express");
const  path  = require("path");
const multer = require('multer');
const router = express.Router();
const productosController = require(path.join(__dirname, '../controllers/productosController'));

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(__dirname, '../../public/img/productos'))
    },
    filename: (req,file,cb)=>{
        cb(null, `${req.body.name}_img_${Date.now()}${path.extname(file.originalname)}`);

    }
});
const uploadFile = multer({storage});



router.get('/', productosController.productos);

router.get('/agregar' , productosController.agregar);
router.post('/', uploadFile.single('imgProducto'), productosController.store )

router.get('/editar/:id', productosController.editar);
router.put('/editar/:id', productosController.guardarEdicion )

router.get('/eliminar/:id', productosController.eliminar);
router.delete('/eliminar/:id', productosController.guardarEliminar )


router.get('/detalle-producto/:id', productosController.detalle);

module.exports = router;