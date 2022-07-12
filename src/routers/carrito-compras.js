const express = require("express");
const  path  = require("path");
const router = express.Router();
const carritoController = require(path.join(__dirname, '../controllers/carritoController'));

router.post('/', carritoController.agregarProducto);
router.get('/', carritoController.carrito);

module.exports = router;