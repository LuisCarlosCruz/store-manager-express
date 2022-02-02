const productsModel = require('../models/productsModel');

const createProduts = async (name, quantity) => {
  const produts = await productsModel.createProduts(name, quantity);
  return produts;
};

module.exports = { createProduts };
