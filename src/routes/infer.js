// src/routes/infer.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const infer = require('../model/inference');

router.post('/', auth, (req, res) => {
  // Log the request details
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Request received from ${req.user.user}`);
  
  const { text = '' } = req.body || {}; // Add default values for safety
  if (!text) return res.status(400).json({ error: 'Missing "text" field' });

  try {
    const result = infer(text);

    // Log the result
    console.log(`[${timestamp}] Inference completed successfully for user ${req.user.user}`);
    res.json({ result });
  } catch (error) {
    console.error(`[${timestamp}] Inference error:`, error);
    res.status(500).json({ error: 'Inference processing failed' });
  }
});

module.exports = router;
