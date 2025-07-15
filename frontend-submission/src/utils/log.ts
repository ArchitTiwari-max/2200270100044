import axios from 'axios';

const LOG_API_URL = 'http://28.244.56.144/evaluation-service/logs';

export async function logEvent(
  token: string,
  stack: 'frontend',
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  pkg: 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils',
  message: string
) {
  try {
    const res = await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Log Created:', res.data);
  } catch (err: any) {
    console.error('Logging failed:', err.response?.data || err.message);
  }
}
