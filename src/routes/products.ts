import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.status(200).json({
    msg: 'GET Request',
  });
});

router.post('/', (req, res, _next) => {
  const product = {
    name: req.body.name,
    price: +req.body.price,
  };
  res.status(201).json({
    msg: 'POST Request',
    product: product,
  });
});

router.get('/:prodId', (req, res, _next) => {
  const prodID = req.params.prodId;
  res.status(200).json({
    msg: 'GET particular product',
    id: prodID,
  });
});

router.patch('/:prodId', (req, res, _next) => {
  const prodID = req.params.prodId;
  res.status(200).json({
    msg: 'UPDATE particular product',
    id: prodID,
  });
});

router.delete('/:prodId', (req, res, _next) => {
  const prodID = req.params.prodId;
  res.status(200).json({
    msg: 'DELETE particular product',
    id: prodID,
  });
});

export default module.exports = router;
