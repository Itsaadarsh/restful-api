import express from 'express';
import prodRouter from './routes/products';
import orderRouter from './routes/order';
import userRouter from './routes/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();

// Adding user globally to express.Request
declare global {
  namespace Express {
    interface Request {
      user: string | object;
    }
  }
}
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Handling
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
// Images route
app.use('/images', express.static('images'));
// User Route
app.use('/user', userRouter);

// Error handling
app.use((_req, res, _next) => {
  const err: Error = new Error('Invalid route');
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Listening to PORT and Connecting to Data Base
app.listen(3000, async () => {
  await mongoose.connect(
    `mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/restapi?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  console.log('Connected to Database');
  console.log('Listening at PORT 3000');
});
