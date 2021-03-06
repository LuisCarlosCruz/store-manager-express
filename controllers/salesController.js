const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

const createSale = async (req, res, _next) => {
    try {
    const { body: bodySale } = req;
    const sale = await salesService.createSale(bodySale);
    // console.log(sale, 'controller');
    if (sale === 'empty') {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: 'Such amount is not permitted to sell' }); 
    }

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
    console.log(err);
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

const updateSaleById = async (req, res, _next) => {
  const { id } = req.params;
  
  const { body } = req;

  const sale = await salesService.updateSaleById(id, body);

  if (sale === null) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' }); 
  }

  return res.status(StatusCodes.OK).json(sale);
};

const deleteSaleById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.deleteSaleById(id);

    if (sale === null) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' });
  
    return res.status(StatusCodes.OK).json(sale);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

// ===============================================================

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSaleById,
  deleteSaleById,
};
