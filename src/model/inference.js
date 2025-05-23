// src/model/inference.js
module.exports = function infer(text) {
  if (text === null || text === undefined) {
    throw new Error('Input text cannot be null or undefined');
  }
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }
  return text.split('').reverse().join('');
};
