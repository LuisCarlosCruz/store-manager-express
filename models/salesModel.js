const connection = require('./connection');

const getAllSales = async () => {
  const [allSales] = await connection
    .execute(
`SELECT SP.sale_id AS saleId, S.date, SP.product_id, SP.quantity
FROM sales_products AS SP INNER JOIN sales AS S ON SP.sale_id = S.id`,
    );
  return allSales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(`
SELECT s.date, p.product_id, p.quantity 
FROM sales_products AS p INNER JOIN sales AS s ON p.sale_id = s.id WHERE s.id = ?`, [id]);
  return sale;
};

// ====================== ARQ MORTO===========================
const createSale = async (bodySale) => {
  const [sale] = await connection
  .query('INSERT INTO StoreManager.sales (date) VALUES (NOW());');

  await Promise.all(
  bodySale.map(async (product) => {
    connection.query(
      'INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity) VALUES (?,?,?);',
    [sale.insertId, product.product_id, product.quantity],
    );
  }),
  );
  return { id: sale.insertId, itemsSold: bodySale };
};

  module.exports = {
    getAllSales,
    getSaleById,
    createSale,
  };