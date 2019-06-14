const jwt = require('jsonwebtoken');
const config = require('../helpers/config');

const checkToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: 'Please provide a token' });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secret, (err, payload) => {
      if (err) {
        return res.json({
          status: 401,
          success: false,
          message: 'Token not valid',
        });
      }
      req.payload = payload;
      next();
    });
  } else {
    return res.json({
      success: false,
      message: 'Token not supplied',
    });
  }
};
module.exports = {
  checkToken,
};
