// src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
    const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format. Use: Bearer <token>' });
  }
  const token = parts[1];
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set');
    return res.status(500).json({ error: 'Server authentication configuration error' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally add specific JWT options to prevent vulnerabilities
    // const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    req.user = decoded;
    next();
  } catch (err) {
      res.status(401).json({ error: 'Invalid or expired token' });
      // Log authentication failures (without sensitive information)
      console.warn(`[${new Date().toISOString()}] Authentication failure: ${err.name}`);
  }
};
