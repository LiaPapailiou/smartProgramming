const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Exercises = mongoose.model('Exercises', exerciseSchema);

module.exports = Exercises;