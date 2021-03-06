const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  exercise: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  factor: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Exercises = mongoose.model('Exercises', exerciseSchema);

module.exports = Exercises;