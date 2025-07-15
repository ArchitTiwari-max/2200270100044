import axios from 'axios';

const LOG_API_URL = 'http://28.244.56.144/evaluation-service/logs';

export async function logEvent(
  token: string,
  stack: 'frontend' | 'backend',
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  pkg:
    | 'cache' | 'controller' | 'cron job' | 'domain' | 'handler'
    | 'repository' | 'route' | 'service' | 'auth' | 'config'
    | 'middleware' | 'utils' | 'api' | 'component' | 'hook'
    | 'page' | 'state' | 'style',
  message: string
) {
  try {
    const response = await axios.post(
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
    console.log('Log Created:', response.data);
  } catch (error) {
    console.error('Log Error:', error.response?.data || error.message);
  }
}
