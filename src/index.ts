import express from 'express';
import prodRouter from './routes/products';
import orderRouter from './routes/order';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();

mongoose.connect(
  `mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/restapi?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH');
    return res.status(200).json({});
  }
  next();
  return;
});

// Product route
app.use('/product', prodRouter);
// Order route
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
