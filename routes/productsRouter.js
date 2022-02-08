const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const validateMiddleware = require('../middlewares/validateMiddleware');

// R4
router.delete('/:id', productsController.deleteById);

// R3
router.put('/:id',
validateMiddleware.validateNameUpdate,
validateMiddleware.validateQuantity,
productsController.updateProductById);

// R2
router.get('/:id', productsController.getProductById);
router.get('/', productsController.getAllProduts);

// R1
router.post('/',
validateMiddleware.validateName,
validateMiddleware.validateQuantity,
productsController.createProduts);

module.exports = router;