const express = require('express');
const router = express.Router();
const path = require('path');
const productosController = require(path.join(__dirname, '../../controllers/api/productosController'))

router.get('/searchAll', productosController.searchAll);
router.get('/list', productosController.list);

router.get('/searchOne/:id', productosController.searchOne);
router.post('/update/:id', productosController.update);



module.exports = router;