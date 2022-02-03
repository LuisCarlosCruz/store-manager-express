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

const updateProductById = async (id, name, quantity) => {
  await connection.execute(
`UPDATE products
SET name = ?, quantity = ?
WHERE id = ?`, [name, quantity, id],
);

  const newProd = await getProductById(id);
  return newProd;
};
// =================================================
const deleteById = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = { 
  createProduts,
  getProductByName,
  getAllProduts,
  getProductById,
  updateProductById,
  deleteById,
};
