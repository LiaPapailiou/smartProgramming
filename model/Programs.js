const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  weekOne: [{
    percentageOne: {
      type: Number,
    },
    reps_minOne: {
      type: Number,

    },
    reps_maxOne: {
      type: Number,

    },
    setsOne: {
      type: Number,
    },
    exercisesOne: [{
      exerciseListOne: [{
        type: Array,
        default: [],
      }]
    }]
  }],
  weekTwo: [{
    percentageTwo: {
      type: Number,
    },
    reps_minTwo: {
      type: Number,

    },
    reps_maxTwo: {
      type: Number,

    },
    setsTwo: {
      type: Number,
    },
    exercisesTwo: [{
      exerciseListTwo: [{
        type: Array,
        default: [],
      }]
    }]
  }],
  weekThree: [{
    percentageThree: {
      type: Number,
    },
    reps_minThree: {
      type: Number,

    },
    reps_maxThree: {
      type: Number,

    },
    setsThree: {
      type: Number,
    },
    exercisesThree: [{
      exerciseListThree: [{
        type: Array,
        default: [],
      }]
    }]
  }],
  weekFour: [{
    percentageFour: {
      type: Number,
    },
    reps_minFour: {
      type: Number,

    },
    reps_maxFour: {
      type: Number,

    },
    setsFour: {
      type: Number,
    },
    exercisesFour: [{
      exerciseListFour: [{
        type: Array,
        default: [],
      }]
    }]
  }],

});


const Programs = mongoose.model('Programs', programSchema);

module.exports = Programs;