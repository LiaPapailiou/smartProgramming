const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  const privateKey = fs.readFileSync(path.join(__dirname,'../jwtkeys/jwtRS256.key.pub'), 'utf8');

  if(!token) return res.status(401).json({ msg: 'Authorization denied'});

  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};