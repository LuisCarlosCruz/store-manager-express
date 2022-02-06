const { StatusCodes } = require('http-status-codes');
const productsModel = require('../models/productsModel');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"name" is required' }); 
  }
  if (name.length < 5) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 5 characters long' }); 
  }
  const prodExicts = await productsModel.getProductByName(name);
  if (prodExicts.length > 0) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Product already exists' });
  }
  next();
};

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"quantity" is required' }); 
  }
  if (typeof quantity === 'string' || quantity < 1) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ message: '"quantity" must be a number larger than or equal to 1' }); 
  }
  next();
};

const validateNameUpdate = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"name" is required' }); 
  }
  if (name.length < 5) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 5 characters long' }); 
  }
  next();
};

// ==============================

const validateSale = async (req, res, next) => {
  const [sale] = req.body;
  const { product_id: productID, quantity } = sale;

  if (productID === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST).json({ message: '"product_id" is required' }); 
  }
  if (quantity === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST).json({ message: '"quantity" is required' });
  }
  if (quantity < 1 || typeof quantity === 'string') {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }
  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateNameUpdate,
  validateSale,
};