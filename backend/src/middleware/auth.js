const ApiError = require('../utils/ApiError');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or invalid authorization header'));
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new ApiError(401, 'Missing token'));
  }
  req.user = { id: 'anonymous', token };
  next();
}

module.exports = auth;
