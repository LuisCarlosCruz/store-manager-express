const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

const { error } = require('./middlewares/errorMiddleware');

const salesRouter = require('./routes/salesRouter');
const productsRouter = require('./routes/productsRouter');

app.use('/sales', salesRouter);
app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
