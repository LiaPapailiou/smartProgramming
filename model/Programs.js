const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
  },
  month: String,
  year: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  weekOne: [{
    percentageOne: Number,
    reps_minOne: Number,
    reps_maxOne: Number,
    setsOne: Number,
    exercisesOne: [{
      exerciseListOne: Array,
    }]
  }],
  weekTwo: [{
    percentageTwo: Number,
    reps_minTwo: Number,
    reps_maxTwo: Number,
    setsTwo: Number,
    exercisesTwo: [{
      exerciseListTwo: Array,
    }]
  }],
  weekThree: [{
    percentageThree: Number,
    reps_minThree: Number,
    reps_maxThree: Number,
    setsThree: Number,
    exercisesThree: [{
      exerciseListThree: Array,
    }]
  }],
  weekFour: [{
    percentageFour: Number,
    reps_minFour: Number,
    reps_maxFour: Number,
    setsFour: Number,
    exercisesFour: [{
      exerciseListFour: Array,
    }]
  }],

});


const Programs = mongoose.model('Programs', programSchema);

module.exports = Programs;