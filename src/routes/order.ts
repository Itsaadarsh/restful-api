import express from 'express';
import mongoose from 'mongoose';
import orderModel from '../models/orders';
import productModel from '../models/product';
const router = express.Router();

router.get('/', async (_req, res, _next) => {
  res.status(200).json({
    msg: 'GET Request Order',
  });
});

router.post('/', async (req, res, _next) => {
  try {
    const order = new orderModel({
      _id: new mongoose.Types.ObjectId(),
      prodId: req.body.prodId,
      quantity: +req.body.quantity,
    });
    const productID = await productModel.findById(req.body.prodId);
    console.log(productID);

    // const savedOrder = await order.save();
    // res.status(201).json({
    //   msg: 'Order saved',
    //   order: savedOrder,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.get('/:orderID', async (req, res, _next) => {
  const orderID = req.params.orderID;
  res.status(200).json({
    msg: 'GET particular order',
    id: orderID,
  });
});

router.delete('/:orderID', async (req, res, _next) => {
  const orderID = req.params.orderID;
  res.status(200).json({
    msg: 'DELETE particular order',
    id: orderID,
  });
});

export default module.exports = router;
