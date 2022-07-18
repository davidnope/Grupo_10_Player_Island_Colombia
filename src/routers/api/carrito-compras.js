const express = require("express");
const  path  = require("path");
const router = express.Router();
const carritoController = require(path.join(__dirname, '../../controllers/api/carritoController'));


router.get('/eliminar',carritoController.eliminarProducto)

router.get('/cantidad',carritoController.cantidad)


module.exports = router;