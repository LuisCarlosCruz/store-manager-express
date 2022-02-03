const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

const validateMiddleware = require('./middlewares/validateMiddleware');

const { error } = require('./middlewares/errorMiddleware');
const productsController = require('./controllers/productsController');

// ====================================

// R4

app.delete('/products/:id', productsController.deleteById);

// ==============================

// R3
app.put('/products/:id',
validateMiddleware.validateNameUpdate,
validateMiddleware.validateQuantity,
productsController.updateProductById);

// R2
app.get('/products/:id', productsController.getProductById);
app.get('/products', productsController.getAllProduts);

// R1
app.post('/products',
validateMiddleware.validateName,
validateMiddleware.validateQuantity,
productsController.createProduts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
