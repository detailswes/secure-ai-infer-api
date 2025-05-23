// src/app.js
const express = require('express');
const inferRoute = require('./routes/infer');
// const logRequest = require('./utils/logger');

require('dotenv').config();

const app = express();
app.use(express.json()); 

app.use('/infer', inferRoute);

app.get('/health', (req, res) => {
  res.status(200).send('HEALTH CHECK - OK\n');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
