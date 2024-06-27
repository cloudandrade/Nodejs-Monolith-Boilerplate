const mongoose = require('mongoose');
const { Schema } = mongoose;

const HelloSchema = new Schema({
  helloText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hello', HelloSchema);