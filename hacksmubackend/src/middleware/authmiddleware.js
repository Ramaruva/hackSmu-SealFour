const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { requireAuth } = require('@propelauth/express');
dotenv.config();

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

// Also include the PropelAuth middleware for advanced usage
exports.propelAuthMiddleware = requireAuth({
  authUrl: process.env.PROPEL_AUTH_URL,
});
