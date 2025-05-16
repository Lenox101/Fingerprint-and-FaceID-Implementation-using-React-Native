const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token after 'Bearer '

  if (token == null) {
    return res.sendStatus(401); // If there's no token, return 401 Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // If token is invalid or expired, return 403 Forbidden
    }
    req.user = user; // Attach user payload to the request object
    next(); // Pass control to the next middleware or route handler
  });
};

module.exports = verifyToken;