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
  clientPhone: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  clientSport: {
    type: String,
  },
  clientWeight: [
    {
      weight: {
        type: Number,
      },
      added: {
        type: Date,
        default: Date.now,
      },
    },
  ],
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
      added: {
        type: Date,
        default: Date.now,
      }
    },
  ],
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Clients = mongoose.model('Clients', clientSchema);

module.exports = Clients;