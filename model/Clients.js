const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  sport: {
    type: String,
  },
  oneRM: {
    benchPress: [
      {
      type: Number,
      required: true,
      },
    ],
    squat: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Clients = mongoose.model('Clients', clientSchema);

module.exports = Clients;