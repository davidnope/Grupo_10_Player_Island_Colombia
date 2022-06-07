const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '../../controllers/api/userController'))

router.get('/list', userController.list)
router.post('/create', userController.create)
router.put('/update/:id', userController.update)

module.exports = router;