import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: mongoose.Schema.Types.String, required: true },
  price: { type: mongoose.Schema.Types.Number, required: true },
});

const productModel = mongoose.model('product', productSchema);

export default module.exports = productModel;
