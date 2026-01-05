
const mongoose = require('mongoose');

//? Define the Product schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  imgSrc: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: mongoose.Schema.Types.Mixed, required: true },
  about: { type: [String], required: true },
});

// ?Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
