const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const validateMiddleware = require('../middlewares/validateMiddleware');

// R10
router.delete('/:id', salesController.deleteSaleById);

// R7
router.put('/:id', validateMiddleware.validateSale, salesController.updateSaleById);

// R5
router.post('/', validateMiddleware.validateSale, salesController.createSale);

// R6
router.get('/:id', salesController.getSaleById);
router.get('/', salesController.getAllSales);

module.exports = router;
