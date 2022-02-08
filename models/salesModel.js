const connection = require('./connection');
const productsModel = require('./productsModel');

const createSale = async (bodySale) => {
  // const [body] = bodySale;
  // const { product_id: productID } = body;

  const existProd = await Promise.all(bodySale.map(async (item) => {
    const [id] = await productsModel.getProductById(item.product_id);
    if (id === undefined) return null;
    return id.id;
  }));

  if (existProd.includes(null)) return null; 

  const [sale] = await connection
  .query('INSERT INTO StoreManager.sales (date) VALUES (NOW());');

  await Promise.all(
  bodySale.map(async (product) => {
    connection.query(
      'INSERT INTO sales_products (sale_id,product_id, quantity) VALUES (?,?,?);',
    [sale.insertId, product.product_id, product.quantity],
    );
  }),
  );
  return { id: sale.insertId, itemsSold: bodySale };
};

const getAllSales = async () => {
  const [allSales] = await connection
  .query(
  `SELECT SP.sale_id AS saleId, S.date, SP.product_id, SP.quantity
  FROM sales_products AS SP INNER JOIN sales AS S ON SP.sale_id = S.id`,
  );
  return allSales;
};

const getSaleById = async (id) => {
  const [result] = await connection
    .query(`SELECT S.date, SP.product_id, SP.quantity FROM sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
    WHERE S.id =?;`, [id]);
    if (!result) return null;
    return result;
};

// =======================================================
const updateSaleById = async (id, body) => {
  const [saleExists] = await getSaleById(id);

  if (saleExists === undefined) return null;

  await Promise.all(body.map(async (product) => {
    const { product_id: productID, quantity } = product;
    return connection.query(
      `UPDATE sales_products
      SET product_id = ?, quantity = ?
      WHERE sale_id = ?`, [productID, quantity, id],
    );
  }));

  return {
    saleId: +id,
    itemUpdated: body,
  }; 
};

  module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSaleById,
  };