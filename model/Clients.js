const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercises',
  },
  clientFirstName: {
    type: String,
    required: true,
  },
  clientLastName: {
    type: String,
  },
  clientPhone: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  clientSport: {
    type: String,
  },
  clientOneRM: [
    {
      benchPress: {
        type: Number,
        required: true,
      },
      squat: {
        type: Number,
        required: true,
      },
    },
  ],
  notes: {
    type: String,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Clients = mongoose.model('Clients', clientSchema);

module.exports = Clients;