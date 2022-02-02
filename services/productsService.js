const productsModel = require('../models/productsModel');

const createProduts = async (name, quantity) => {
  const produts = await productsModel.createProduts(name, quantity);
  return produts;
};

const getAllProduts = async () => {
  const produts = await productsModel.getAllProduts();
  return produts;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (product.length === 0) return null;
  return product;
};

module.exports = { createProduts, getAllProduts, getProductById };
