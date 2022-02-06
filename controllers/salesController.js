const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

const createSale = async (req, res, _next) => {
    try {
    const { body: bodySale } = req;
    const sale = await salesService.createSale(bodySale);
    if (sale === null) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Erro' });
    return res.status(StatusCodes.CREATED).json(sale);
  } catch (err) {
      console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

const getAllSales = async (_req, res, _next) => {
  try {
    const allSales = await salesService.getAllSales();

    return res.status(StatusCodes.OK).json(allSales);
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
    }
  };

const getSaleById = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const sale = await salesService.getSaleById(id);

    if (sale.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' }); 
    }
    return res.status(StatusCodes.OK).json(sale);
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
