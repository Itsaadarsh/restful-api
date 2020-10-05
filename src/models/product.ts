import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: mongoose.Schema.Types.String,
  price: mongoose.Types.Decimal128,
});

const productModel = mongoose.model('product', productSchema);

export default module.exports = productModel;
