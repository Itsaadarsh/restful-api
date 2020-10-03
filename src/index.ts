import express from 'express';
import prodRouter from './routes/products';
import orderRouter from './routes/order';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));
app.use('/product', prodRouter);
app.use('/orders', orderRouter);

// Error handling
app.use((_req, _res, next) => {
  const err: Error = new Error();
  err.message = 'Not found';
  err.status = 404;
  next(err);
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log('Listening at PORT 3000');
});
