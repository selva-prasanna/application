const mongoose = require('mongoose');

//? Define the NewArrival schema
const NewArrivalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  imgSrc: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: mongoose.Schema.Types.Mixed, required: true },
  about: { type: [String], required: true }
});

// ?Create the NewArrival model
const NewArrival = mongoose.model('NewArrival', NewArrivalSchema);

module.exports = NewArrival;
