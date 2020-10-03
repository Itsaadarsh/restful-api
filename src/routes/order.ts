import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.status(200).json({
    msg: 'GET Request Order',
  });
});

router.post('/', (_req, res, _next) => {
  res.status(201).json({
    msg: 'POST Request Order',
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
