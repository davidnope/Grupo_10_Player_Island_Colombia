const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '../../controllers/api/userController'))

router.get('/list', userController.list)
router.get('/uno/:id', userController.uno)
router.post('/create', userController.create)
router.put('/update/:id', userController.update)
router.put('/delete/:id', userController.delete)

module.exports = router;