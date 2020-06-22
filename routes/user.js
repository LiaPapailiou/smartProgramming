const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

const User = require('../model/User');

// Register user
router.post('/',[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Passwords must be between 5 and 10 characters long').isLength({ min: 6, max: 12 }),
], async (req, res) => {
  const { name, email, password} = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user =  await User.findOne({ email });

    if (user) return res.status(400).json({ errors: [{ msg: 'User allready exists in the database' }] });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    user =  await User.create({ name, email, password });
    const payload = {  user: { id: user.id }};
    const privateKey =  fs.readFileSync(path.join(__dirname, '../jwtkeys/jwtRS256.key'), 'utf8');
    const signOptions = {
      expiresIn: '7d',
      algorithm: 'RS256',
    };
    jwt.sign(payload, privateKey, signOptions, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;