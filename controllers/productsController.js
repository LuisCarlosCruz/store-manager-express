const { StatusCodes } = require('http-status-codes');
const productsService = require('../services/productsService');

const createProduts = async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    const produts = await productsService.createProduts(name, quantity);
    return res.status(StatusCodes.CREATED).json(produts);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err.message);
  }
};

const getAllProduts = async (_req, res, _next) => {
  try {
    const produts = await productsService.getAllProduts();
    return res.status(StatusCodes.OK).json(produts);
  } catch (err) {
    return res.status(StatusCodes.NO_CONTENT).json(err.message);
  }
};

const getProductById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const produt = await productsService.getProductById(id);
    if (produt === null) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Product not found' }); 
    }
    return res.status(StatusCodes.OK).json(produt[0]);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err.message);
  }
};
const updateProductById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const newProd = await productsService.updateProductById(id, name, quantity);
    if (newProd === null) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Product not found' }); 
    }
    return res.status(StatusCodes.OK).json(newProd[0]);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err.message);
  }
};

// ==========================================================================

const deleteById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const delProd = await productsService.deleteById(id);

    if (delProd === null) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    }

    return res.status(StatusCodes.OK).json(delProd);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err.message);
  }
};

module.exports = {
  createProduts,
  getAllProduts,
  getProductById,
  updateProductById,
  deleteById,
};