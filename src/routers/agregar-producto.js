const express = require('express');
const router = express.Router();
const path = require('path');
const agregarProductoController = require('../controllers/agregarProducto');

router.get('/', agregarProductoController.agregarProducto);

module.exports = router;