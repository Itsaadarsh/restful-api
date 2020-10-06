import express from 'express';
import mongoose from 'mongoose';
import orderModel from '../models/orders';
import productModel from '../models/product';
const router = express.Router();

router.get('/', async (_req, res, _next) => {
  try {
    const getOrder = await orderModel.find().select('prodId quantity _id');
    if (getOrder.length == 0) {
      res.status(404).json({ message: 'No data found' });
    } else {
      res.status(200).json({
        count: getOrder.length,
        orders: getOrder,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.post('/', async (req, res, _next) => {
  try {
    const productID = await productModel.findById(req.body.prodId);
    if (productID) {
      const order = new orderModel({
        _id: new mongoose.Types.ObjectId(),
        prodId: productID._id,
        quantity: req.body.quantity,
      });
      const savedOrder = await order.save();
      res.status(201).json({
        msg: 'Order saved',
        order: savedOrder,
      });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.get('/:orderID', async (req, res, _next) => {
  try {
    const orderID = req.params.orderID;
    const foundOrder = await orderModel.findById(orderID).select('prodId quantity _id');
    if (foundOrder) {
      res.status(200).json(foundOrder);
    } else {
      res.status(404).json({ message: 'No order found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.delete('/:orderID', async (req, res, _next) => {
  try {
    const orderID = req.params.orderID;
    const deleteOrder = await orderModel.deleteOne({ _id: orderID });
    if (deleteOrder.n == 1) {
      res.status(200).json({ message: `Order ${orderID} deleted successfully` });
    } else {
      res.status(404).json({ message: `Order not deleted` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

export default module.exports = router;
