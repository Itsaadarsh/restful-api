import express from 'express';
import Mongoose from 'mongoose';
import productModel from '../models/product';
const router = express.Router();

router.get('/', async (_req, res, _next) => {
  try {
    const prod = await productModel.find();
    if (prod.length == 0) {
      res.status(404).json({ message: 'data not found' });
    } else {
      res.status(200).json(prod);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.post('/', async (req, res, _next) => {
  const product = new productModel({
    _id: new Mongoose.Types.ObjectId(),
    name: req.body.name,
    price: +req.body.price,
  });
  try {
    const prod = await product.save();
    res.status(201).json(prod);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.get('/:prodId', async (req, res, _next) => {
  try {
    const prodID = req.params.prodId;
    const prod = await productModel.findById(prodID);
    if (prod) {
      res.status(200).json(prod);
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.patch('/:prodId', async (req, res, _next) => {
  const prodID = req.params.prodId;
  res.status(200).json({
    msg: 'UPDATE particular product',

    id: prodID,
  });
});

router.delete('/:prodId', async (req, res, _next) => {
  const prodID = req.params.prodId;
  res.status(200).json(prodID);
});

export default module.exports = router;
