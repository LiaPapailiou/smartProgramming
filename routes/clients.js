const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();
const Clients = require('../model/Clients');
const Exercises = require('../model/Exercises');
const Programs = require('../model/ProgramsNew');
const ObjectId = require('mongodb').ObjectID;

// Get the list of all clients in the DB
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Clients.find({ user: req.user.id }).sort({ clientLastName: 1, clientFirstName: 1 }).populate('Clients', ['clientFirstName', 'clientLastName']);
    res.json(clients);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get client by id
router.get('/search/:client_id', auth, async (req, res) => {
  try {
    let client = await Clients.findById(req.params.client_id);
    if (!client)
      return res.status(404).json({ msg: 'Client not found in the database' });
    res.json(client);
  } catch (err) {

    res.status(500).send('Internal Server Error');
  }
});

// Get programs for client 
router.get(('/get-programs/:client_id'), auth, async (req, res) => {
  try {

    const programArray = await Programs.aggregate([
      { $match: { client: ObjectId(req.params.client_id) } },
      { $unwind: "$programs" },
      { $unwind: "$programs.exerciseList" },
    ]);
    if (!programArray) return res.status(404).json({ msg: 'Program not found' });

    const percentages = [];

    // Get data
    programArray.map((item) => {
      percentages.push(item.programs.percentages);
    });


    // Get the client details
    const clientDetails = {
      month: programArray[0].month,
      year: programArray[0].year,
      daysPerWeek: programArray[0].daysPerWeek,
    };


    // Split programs in weeks
    let weekOne = programArray.slice(0, 1)[0].programs;
    let weekTwo = programArray.slice(1, 2)[0].programs;
    let weekThree = programArray.slice(2, 3)[0].programs;
    let weekFour = programArray.slice(3)[0].programs;

    // Use these arrays to create the table in the front end
    weekOne = Object.values(weekOne.exerciseList).slice(0, `${clientDetails.daysPerWeek}`);
    weekTwo = Object.values(weekTwo.exerciseList).slice(0, `${clientDetails.daysPerWeek}`);
    weekThree = Object.values(weekThree.exerciseList).slice(0, `${clientDetails.daysPerWeek}`);
    weekFour = Object.values(weekFour.exerciseList).slice(0, `${clientDetails.daysPerWeek}`);

    // Multiply each week's exercises by the given %
    weekOne.map((one) => one.map((item) => {
      item.min = Math.round(item.min * percentages[0]);
      item.max = Math.round(item.max * percentages[0]);
      return item;
    }));
    weekTwo.map((one) => one.map((item) => {
      item.min = Math.round(item.min * percentages[1]);
      item.max = Math.round(item.max * percentages[1]);
      return item;
    }));
    weekThree.map((one) => one.map((item) => {
      item.min = Math.round(item.min * percentages[2]);
      item.max = Math.round(item.max * percentages[2]);
      return item;
    }));
    weekFour.map((one) => one.map((item) => {
      item.min = Math.round(item.min * percentages[3]);
      item.max = Math.round(item.max * percentages[3]);
      return item;
    }));

    // Return the modified program
    res.json(programArray);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Edit client's information
router.post('/edit/:client_id', auth, async (req, res) => {
  const {
    clientFirstName,
    clientLastName,
    clientPhone,
    clientEmail,
    clientSport,
    clientAge,
    clientHeight,
    weight,
    clientYearsOfTrainingExperience,
    pastInjuries,
    currentInjuries,
    longTermGoals,
    shortTermGoals,
    clientAdditionalInfo,
    clientBodyScreening,
    benchPress,
    squat,
  } = req.body;

  try {
    const newRM = { benchPress, squat };
    const injuries = {
      pastInjuries,
      currentInjuries,
    };
    const goals = {
      longTermGoals,
      shortTermGoals,
    };
    const startingWeight = { weight };
    let client = await Clients.find({ _id: req.params.id });
    if (!client) return res.status(404).json({ msg: 'Client not found in the database' });
    client = await Clients.findByIdAndUpdate(
      {
        _id: req.params.client_id,
      },
      {
        $set: {
          user: req.user.id,
          clientFirstName,
          clientLastName,
          clientPhone,
          clientEmail,
          clientSport,
          clientAge,
          clientHeight,
          'clientWeight.0': startingWeight,
          clientYearsOfTrainingExperience,
          'clientGoals.0': goals,
          'clientInjuries.0': injuries,
          clientAdditionalInfo,
          clientBodyScreening,
          'clientOneRM.0': newRM,
        },
      },
      { new: true, upsert: true }
    );

    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Add a new RM
router.post('/add/:client_id', [auth,
  [
    check('benchPress', 'Bench Press 1RM is required').not().isEmpty(),
    check('squat', 'Squat 1RM is required').not().isEmpty(),
  ],
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const {
    benchPress,
    squat,
  } = req.body;

  const newRM = { benchPress, squat };
  try {
    const client = await Clients.findById(req.params.client_id);
    client.clientOneRM.unshift(newRM);
    await client.save();
    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
// Add weight
router.post('/add-weight/:client_id', [auth,
  [
    check('weight', 'Client weight is required').not().isEmpty(),
  ],
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const {
    weight
  } = req.body;

  const newWeight = { weight };
  try {
    const client = await Clients.findById(req.params.client_id);
    client.clientWeight.unshift(newWeight);
    await client.save();
    res.json(client);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Add notes
router.post('/notes/:client_id', auth, async (req, res) => {
  const { notes } = req.body;
  try {
    let client = await Clients.find({ _id: req.params.id });
    if (!client) return res.status(404).json({ msg: 'Client not found in the database' });
    client = await Clients.findByIdAndUpdate(
      { _id: req.params.client_id },
      { $set: { notes } },
      { new: true, upsert: true },
    );

    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Insert a client into the DB
router.put('/insert', [auth,
  [
    check('clientFirstName', 'First name is required').not().isEmpty(),
    check('clientLastName', 'Last name is required').not().isEmpty(),
    check('benchPress', 'Bench Press 1RM is required').not().isEmpty(),
    check('squat', 'Squat 1RM is required').not().isEmpty(),
  ],
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const {
      clientFirstName,
      clientLastName,
      clientPhone,
      clientEmail,
      clientSport,
      clientAge,
      clientHeight,
      weight,
      clientYearsOfTrainingExperience,
      pastInjuries,
      currentInjuries,
      longTermGoals,
      shortTermGoals,
      clientAdditionalInfo,
      clientBodyScreening,
      benchPress,
      squat,
    } = req.body;

    try {
      let client = await Clients.findOne({ user: req.user.id, clientFirstName, clientLastName });
      if (client) return res.status(409).json({ errors: [{ msg: 'Client already exists' }] });

      const oneRM = {
        benchPress,
        squat,
      };

      const goals = {
        longTermGoals,
        shortTermGoals,
      };
      const injuries = {
        pastInjuries,
        currentInjuries,
      };

      const startingWeight = { weight };

      client = await Clients.create({
        user: req.user.id,
        clientFirstName,
        clientLastName,
        clientPhone,
        clientEmail,
        clientSport,
        clientAge,
        clientHeight,
        clientWeight: startingWeight,
        clientYearsOfTrainingExperience,
        clientAdditionalInfo,
        clientBodyScreening,
        clientInjuries: injuries,
        clientGoals: goals,
        clientOneRM: oneRM,
      });
      res.json(client);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// Delete a client
router.delete('/delete/:client_id', auth, async (req, res) => {
  try {
    await Clients.findByIdAndDelete(req.params.client_id);
    res.json({ msg: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get min - max estimates
router.post('/calculate/:client_id', auth, async (req, res) => {
  const { level } = req.body;
  console.log(level);
  try {
    const client = await Clients.findById(req.params.client_id);
    if (!client) return res.status(404).json({ errors: [{ msg: 'Client not found in the database' }] });

    // Get one RM for current client
    const benchRM = client.clientOneRM[0].benchPress;
    const squatRM = client.clientOneRM[0].squat;

    const exercisesLower = await Exercises.find({ user: req.user.id, body: "Squat" }).select({ exercise: 1, min: 1, max: 1, factor: 1 }).sort();
    const exercisesUpper = await Exercises.find({ user: req.user.id, body: "Bench" }).select({ exercise: 1, min: 1, max: 1, factor: 1 }).sort();
    const exercisesNone = await Exercises.find({ user: req.user.id, body: "None" }).select({ exercise: 1, min: 1, max: 1, factor: 1 }).sort();

    const estimates = [];

    exercisesLower.map((ex) => {
      let min = Math.round(ex.min * squatRM * 10) / 10;
      let max = Math.round(ex.max * squatRM * 10) / 10;
      let { exercise } = ex;
      let { factor } = ex;
      let id = ex._id;
      estimates.push({ id, exercise, min, max, factor });
    });
    exercisesUpper.map((ex) => {
      let min = Math.round(ex.min * benchRM * 10) / 10;
      let max = Math.round(ex.max * benchRM * 10) / 10;
      let { exercise } = ex;
      let { factor } = ex;
      let id = ex._id;
      estimates.push({ id, exercise, min, max, factor });
    });

    exercisesNone.map((ex) => {
      let { exercise, factor, min, max } = ex;
      let id = ex._id;
      estimates.push({ id, exercise, min, max, factor });
    });

    if (level !== undefined) {
      estimates.map((ex) => {
        if (ex.factor === true && level !== undefined) {
          if (level == 0.6) {
            ex.min = Math.round(ex.min * 0.6 * 100) / 100;
            ex.max = Math.round(ex.max * 0.6 * 100) / 100;
          }
          else if (level == 0.75) {
            ex.min = Math.round(ex.min * 0.75 * 100) / 100;
            ex.max = Math.round(ex.max * 0.75 * 100) / 100;
          }
          else if (level == 0.9) {
            ex.min = Math.round(ex.min * 0.9 * 100) / 100;
            ex.max = Math.round(ex.max * 0.9 * 100) / 100;
          }
          else if (level == 1) {
            ex.min = Math.round(ex.min * 100) / 100;
            ex.max = Math.round(ex.max * 100) / 100;
          }
          else if (level == 1.1) {
            ex.min = Math.round(ex.min * 1.1 * 100) / 100;
            ex.max = Math.round(ex.max * 1.1 * 100) / 100;
          } else {
            ex.min = 0;
            ex.max = 0;
          }
        }
      });
    }
    else {
      estimates.map((ex) => {
        if (ex.factor === true) {
          ex.min = 0;
          ex.max = 0;
        }
      });
    }

    res.json(estimates);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }

});
module.exports = router;;
