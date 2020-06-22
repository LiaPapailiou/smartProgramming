const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  clientFirstName: {
    type: String,
    required: true,
  },
  clientLastName: {
    type: String,
  },
  clientSport: {
    type: String,
  },
  clientOneRM: {
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