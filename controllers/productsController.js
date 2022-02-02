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

module.exports = { createProduts };