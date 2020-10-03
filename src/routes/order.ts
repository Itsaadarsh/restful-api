import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.status(200).json({
    msg: 'GET Request Order',
  });
});

router.post('/', (req, res, _next) => {
  const order = {
    prodId: req.body.prodId,
    qty: +req.body.quantity,
  };
  res.status(201).json({
    msg: 'POST Request Order',
    order: order,
  });
});

router.get('/:orderID', (req, res, _next) => {
  const orderID = req.params.orderID;
  res.status(200).json({
    msg: 'GET particular order',
    id: orderID,
  });
});

router.delete('/:orderID', (req, res, _next) => {
  const orderID = req.params.orderID;
  res.status(200).json({
    msg: 'DELETE particular order',
    id: orderID,
  });
});

export default module.exports = router;
