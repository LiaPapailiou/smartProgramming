const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();
const Clients = require('../model/Clients');
const User = require('../model/User');

// Get the list of all clients in the DB
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Clients.find({user: req.user.id}).populate('Clients', [ 'clientFirstName', 'clientLastName' ]);
    res.json(clients);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get client by id
router.get('/search/:client_id', auth, async (req, res) => {
  try {
    const client = await Clients.findById(req.params.client_id);
    if (!client)
      return res.status(404).json({ msg: 'Client not found in the database' });
    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Edit client's information
router.post('/edit/:client_id', auth, async (req, res) => {
  const { 
    clientFirstName,
    clientLastName,
    benchPress,
    squat,
  } = req.body;
  try {
    client = await Clients.findByIdAndUpdate(
      { _id: req.params.client_id },
      {
        $set: {
          user: req.user.id,
          clientFirstName,
          clientLastName,
          "clientOneRM.benchPress": benchPress,
          "clientOneRM.squat": squat,
        },
      },
      { new: true, upsert: true }
    );

    if (!client) return res.status(404).json({ msg: 'Client not found in the database' });
    res.json(client);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Insert a client into the DB
router.put('/add',[ auth,
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
      benchPress,
      squat,
    } = req.body;

    try {
      
      let client = await Clients.findOne({user: req.user.id, clientFirstName, clientLastName });
      if (client) return res.status(409).json({ errors: [{ msg: 'Client already exists' }] });

      client = await Clients.create({
        user: req.user.id,
        clientFirstName,
        clientLastName,
        "clientOneRM.benchPress": benchPress,
        "clientOneRM.squat": squat,
      });
      res.json(client);
    } catch (err) {
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

module.exports = router;
