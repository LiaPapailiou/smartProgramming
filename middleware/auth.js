const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  const key = fs.readFileSync(
    path.join(__dirname, '../jwtkeys/jwtRS256.key.pub'), 'utf8');

  if (!token) return res.status(401).json({ msg: 'Authorization denied' });

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Non valid token' });
  }
};
