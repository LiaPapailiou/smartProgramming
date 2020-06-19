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
      type: "int",
      required: true,
      },
    ],
    squat: [
      {
        type: "int",
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