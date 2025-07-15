const axios = require('axios');

const LOG_API_URL = 'http://28.244.56.144/evaluation-service/logs';

async function logEvent(token, stack, level, pkg, message) {
  try {
    const res = await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Log Created:', res.data);
  } catch (err) {
    console.error('Log Error:', err.response?.data || err.message);
  }
}

module.exports = logEvent;
