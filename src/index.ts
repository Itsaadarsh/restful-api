import express from 'express';
import prodRouter from './routes/products';
import orderRouter from './routes/order';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));
app.use('/product', prodRouter);
app.use('/orders', orderRouter);

app.listen(3000, () => {
  console.log('Listening at PORT 3000');
});
