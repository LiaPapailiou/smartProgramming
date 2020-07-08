const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Exercises = require('../model/Exercises');


// Get all
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercises.find().sort({ exercise: 1 });

    res.json(exercises);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Test
// router.post('/squat-true', async (req, res) => {
//   const { level } = req.body;
//   try {

//     const benchRM = 130;
//     const squatRM = 180;

//     // Get exercises with min - max
//     const exercisesLower = await Exercises.find({ body: "Squat" }).select({ _id: 0, exercise: 1, min: 1, max: 1, factor: 1 }).sort();
//     const exercisesUpper = await Exercises.find({ body: "Bench" }).select({ _id: 0, exercise: 1, min: 1, max: 1, factor: 1 }).sort();
//     const estimates = [];
//     exercisesLower.map((exercise) => {
//       let min = Math.round(exercise.min * squatRM * 100) / 100;
//       let max = Math.round(exercise.max * squatRM * 100) / 100;
//       let name = exercise.exercise;
//       let { factor } = exercise;
//       estimates.push({ name, min, max, factor });
//     });
//     exercisesUpper.map((exercise) => {
//       let min = Math.round(exercise.min * benchRM * 100) / 100;
//       let max = Math.round(exercise.max * benchRM * 100) / 100;
//       let name = exercise.exercise;
//       let { factor } = exercise;
//       estimates.push({ name, min, max, factor });
//     });
//     console.log('BEFORE', estimates);

//     if (level !== undefined) {
//       estimates.map((ex) => {
//         if (ex.factor === true && level !== undefined) {
//           if (level === 0.6) {
//             ex.min = Math.round(ex.min * level * 100) / 100;
//             ex.max = Math.round(ex.max * level * 100) / 100;
//           }
//           else if (level === 0.75) {
//             ex.min = Math.round(ex.min * level * 100) / 100;
//             ex.max = Math.round(ex.max * level * 100) / 100;
//           }
//           else if (level === 0.9) {
//             ex.min = Math.round(ex.min * level * 100) / 100;
//             ex.max = Math.round(ex.max * level * 100) / 100;
//           }
//           else if (level === 1) {
//             ex.min = Math.round(ex.min * 100) / 100;
//             ex.max = Math.round(ex.max * 100) / 100;
//           }
//           else if (level === 1.1) {
//             ex.min = Math.round(ex.min * level * 100) / 100;
//             ex.max = Math.round(ex.max * level * 100) / 100;
//           }
//           else {
//             ex.min = 0;
//             ex.max = 0;
//           }
//         }
//       });
//     }
//     else {
//       estimates.map((ex) => {
//         if (ex.factor === true) {
//           ex.min = 0;
//           ex.max = 0;
//         }
//       });
//     }

//     console.log('AFTER', estimates);


//     res.json(estimates);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Get by ID
router.get('/search/:ex_id', async (req, res) => {
  try {
    const exercise = await Exercises.findById(req.params.ex_id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found in the database' });
    // const min = exercise.min;
    // const max = exercise.max;
    // console.log(min, max);
    res.json(exercise);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Insert
router.put('/insert',
  [
    check('exercise', 'Exercise name is required').not().isEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { exercise, body, min, max, factor } = req.body;
    try {
      let exerciseToInsert = await Exercises.findOne({ exercise });
      if (exerciseToInsert) return res.status(409).json({ msg: 'Exercise already exists' });

      exerciseToInsert = await Exercises.create({
        exercise,
        body,
        min,
        max,
        factor,
      });
      res.json(exerciseToInsert);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Edit
router.post('/edit/:ex_id', async (req, res) => {
  const { exercise, body, min, max, factor } = req.body;
  try {
    let exerciseToEdit = await Exercises.findOne({ _id: req.params.ex_id });
    if (!exerciseToEdit) return res.status(404).json({ msg: 'Exercise not found in the database' });
    exercisesToEdit = await Exercises.findByIdAndUpdate({
      _id: req.params.ex_id,
    },
      {
        $set: {
          exercise,
          body,
          min,
          max,
          factor,
        },
      },
      { new: true, upsert: true });

    if (!exerciseToEdit) return res.status(404).json({ msg: 'Exercise not found in the database' });
    res.json(exerciseToEdit);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Remove
router.delete('/delete/:ex_id', async (req, res) => {
  try {
    await Exercises.findByIdAndDelete(req.params.ex_id);

    res.json({ msg: 'Exercise removed successfully' });

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
