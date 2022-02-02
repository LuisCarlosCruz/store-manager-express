const connection = require('./connection');

const createProduts = async (name, quantity) => {
  const [produts] = await connection.execute(`
  INSERT INTO products (name, quantity) VALUES(?,?)`, [name, quantity]);
  return { 
    id: produts.insertId,
    name,
    quantity,
  };
};

const getProductByName = async (name) => {
  const [prod] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return prod;
};

const getAllProduts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = { 
  createProduts,
  getProductByName,
  getAllProduts,
  getProductById,
};
