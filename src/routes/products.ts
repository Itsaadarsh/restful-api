import express from 'express';
import productModel from '../models/product';
const router = express.Router();
import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public');
//   },
//   filename: function (req, file, cb) {
//     const parts = file.mimetype.split('/');
//     cb(null, Date.now() + file.originalname + '.' + parts);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/', async (_req, res) => {
  try {
    const prod = await productModel.find().select('name price _id');
    if (prod.length == 0) {
      res.status(404).json({ message: 'data not found' });
    } else {
      res.status(200).json({
        count: prod.length,
        products: prod,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.post('/', upload.single('prodImage'), async (req, res) => {
  res.sendFile(`${__dirname}/public/${req.file.filename}`);
  // try {
  //   const product = new productModel({
  //     _id: new Mongoose.Types.ObjectId(),
  //     name: req.body.name,
  //     price: +req.body.price,
  //   });
  //   const prod = await product.save();
  //   res.status(201).json(prod);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: err.message, error: err });
  // }
});

router.get('/:prodId', async (req, res) => {
  const prodID = req.params.prodId;
  try {
    const prod = await productModel.findById(prodID).select('name price _id');
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

router.patch('/:prodId', async (req, res) => {
  const prodID = req.params.prodId;
  try {
    const updated: any = {};
    for (let i of req.body) {
      if (i.method == 'price') {
      }
      updated[i.method] = i.data;
    }
    await productModel.updateOne({ _id: prodID }, { $set: updated });
    res.status(200).json({
      message: `PRODUCT ${prodID} updated`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.delete('/:prodId', async (req, res) => {
  const prodID = req.params.prodId;
  try {
    const prod = await productModel.deleteOne({ _id: prodID });
    if (prod.n == 1) {
      res.status(200).json({
        message: `PRODUCT ${prodID} deleted`,
      });
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, error: err });
  }
});

export default module.exports = router;
