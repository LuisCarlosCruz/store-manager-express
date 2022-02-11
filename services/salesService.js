const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const createSale = async (bodySale) => {
  const [product] = bodySale;
  const [productEst] = await productsModel.getProductById(product.product_id);

  if (productEst.quantity - product.quantity < 0) return 'empty';

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

const updateSaleById = async (id, body) => {
  const sale = await salesModel.updateSaleById(id, body);
  return sale;
};

const deleteSaleById = async (id) => {
  const sale = await salesModel.deleteSaleById(id);
  return sale;
};

// =================================================================

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSaleById,
  deleteSaleById,
};
