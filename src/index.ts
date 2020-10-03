import express from 'express';
import prodRouter from './routes/products';
const app = express();

app.use('/product', prodRouter);

app.listen(3000, () => {
  console.log('Listening at PORT 3000');
});
