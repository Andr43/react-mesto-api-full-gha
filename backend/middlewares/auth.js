const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, 'JWT_SECRET');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
    return;
  }

  req.user = payload;

  next();
};
