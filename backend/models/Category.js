const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
  customId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Category', categorySchema);