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

const getProduct = async (name) => {
  const [prod] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return prod;
};

module.exports = { createProduts, getProduct };
