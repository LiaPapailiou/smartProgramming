const express = require('express');
// const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();
const Programs = require('../model/Programs');

module.exports = router;

// Get all
router.get('/', auth, async (req, res) => {
  try {
    const programs = await Programs.find().sort({ month: 1 });
    res.json(programs);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get by ID
router.get('/search/:program_id', auth, async (req, res) => {
  try {
    const program = await Programs.findById(req.params.program_id);
    if (!program) return res.status(404).json({ msg: 'Program not found in the database' });

    res.json(program);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Add exercise
router.post('/add/:program_id', auth, async (req, res) => {
  const { exerciseList } = req.body;

  try {
    let program = await Programs.findById(req.params.program_id);
    if (!program) return res.status(404).json({ msg: 'Program not found in the database' });
    // Add day
    program.weekOne[0].exercisesOne[0].exerciseListOne.push(exerciseList);
    program.markModified('exercisesOne[0].exerciseListOne');
    // Add single exercise in day
    // program.weekOne[0].exercisesOne[0].exerciseListOne[0].push(exerciseList);
    await program.save();
    res.json(program);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});
// Insert
router.put('/insert', auth, async (req, res) => {

  const { client_id, month, year, percentageOne, percentageTwo, percentageThree, percentageFour, reps_minOne, reps_minTwo, reps_minThree, reps_minFour, reps_maxOne, reps_maxTwo, reps_maxThree, reps_maxFour, setsOne, setsTwo, setsThree, setsFour, exerciseListOne, exerciseListTwo, exerciseListThree, exerciseListFour } = req.body;

  try {
    let program = await Programs.findOne({
      $and: [{ month: month },
      { year: year },
      { client: client_id }]
    });

    if (program) return res.status(409).json({ errors: [{ msg: 'Program for that client already exists' }] });

    const weekOne = {
      percentageOne,
      reps_minOne,
      reps_maxOne,
      setsOne,
    };

    const weekTwo = {
      percentageTwo,
      reps_minTwo,
      reps_maxTwo,
      setsTwo,
    };

    const weekThree = {
      percentageThree,
      reps_minThree,
      reps_maxThree,
      setsThree,
    };

    const weekFour = {
      percentageFour,
      reps_minFour,
      reps_maxFour,
      setsFour,
    };


    program = await Programs.create({
      user: req.user.id,
      client: client_id,
      month,
      year,
      weekOne: weekOne,
      'weekOne.0.exercisesOne.0.exerciseListOne': exerciseListOne,
      weekTwo: weekTwo,
      'weekTwo.0.exercisesTwo.0.exerciseListTwo': exerciseListTwo,
      weekThree: weekThree,
      'weekThree.0.exercisesThree.0.exerciseListThree': exerciseListThree,
      weekFour: weekFour,
      'weekFour.0.exercisesFour.0.exerciseListFour': exerciseListFour,
    });

    res.json(program);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Edit
// router.post('/edit/:program_id', async (req, res) => {
//   const { client_id, month, year, percentageOne, percentageTwo, percentageThree, percentageFour, reps_minOne, reps_minTwo, reps_minThree, reps_minFour, reps_maxOne, reps_maxTwo, reps_maxThree, reps_maxFour, setsOne, setsTwo, setsThree, setsFour, exerciseListOne, exerciseListTwo, exerciseListThree, exerciseListFour } = req.body;
//   try {
//     const weekOne = {
//       percentageOne,
//       reps_minOne,
//       reps_maxOne,
//       setsOne,
//     };

//     const weekTwo = {
//       percentageTwo,
//       reps_minTwo,
//       reps_maxTwo,
//       setsTwo,
//     };

//     const weekThree = {
//       percentageThree,
//       reps_minThree,
//       reps_maxThree,
//       setsThree,
//     };

//     const weekFour = {
//       percentageFour,
//       reps_minFour,
//       reps_maxFour,
//       setsFour,
//     };
//     let program = await Programs.findById(req.params.program_id);
//     if (!program) return res.status(404).json({ msg: 'Program not found in the database' });
//     program = await Programs.findByIdAndUpdate(
//       { _id: req.params.program_id },
//       {
//         $set: {
//           // user: req.user.id,
//           client: client_id,
//           month,
//           year,
//           weekOne: weekOne,
//           'weekOne.0.exercisesOne.0.exerciseListOne': {
//             $addToSet: { exerciseListOne }
//           },
//           weekTwo: weekTwo,
//           'weekTwo.0.exercisesTwo.0.exerciseListTwo': exerciseListTwo,
//           weekThree: weekThree,
//           'weekThree.0.exercisesThree.0.exerciseListThree': exerciseListThree,
//           weekFour: weekFour,
//           'weekFour.0.exercisesFour.0.exerciseListFour': exerciseListFour,
//         }
//       },
//       { new: true, upsert: true }
//     );
//     res.json(program);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Delete
router.delete('/delete/:program_id', auth, async (req, res) => {
  try {
    let program = await Programs.findById(req.params.program_id);
    if (!program) return res.status(404).json({ msg: 'Program not found in the database' });
    await Programs.findByIdAndDelete(req.params.program_id);
    res.json({ msg: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

