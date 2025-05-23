// generate-token.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET environment variable is not defined');
  console.error('Please set it in your .env file or environment');
  process.exit(1);
}
const token = jwt.sign({ user: 'test-user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('JWT Token:', token);
