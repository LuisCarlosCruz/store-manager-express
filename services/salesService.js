const salesModel = require('../models/salesModel');

const createSale = async (bodySale) => {
  const sale = await salesModel.createSale(bodySale);
  return sale;
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
