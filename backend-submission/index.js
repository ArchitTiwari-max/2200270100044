const express = require('express');
const dotenv = require('dotenv');
const logEvent = require('./logger');

dotenv.config();

const app = express();
app.use(express.json());

app.post('/average', async (req, res) => {
  try {
    const numbers = req.body.numbers;

    if (!Array.isArray(numbers)) {
      await logEvent(process.env.TOKEN, 'backend', 'error', 'handler', 'Invalid input: not an array');
      return res.status(400).json({ error: 'Invalid input' });
    }

    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    await logEvent(process.env.TOKEN, 'backend', 'info', 'handler', `Calculated average: ${avg}`);
    return res.status(200).json({ average: avg });
  } catch (err) {
    await logEvent(process.env.TOKEN, 'backend', 'fatal', 'handler', 'Unhandled error in /average');
    return res.status(500).json({ error: 'Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
