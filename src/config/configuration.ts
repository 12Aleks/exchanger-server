import * as process from 'node:process';

export default () => ({
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  API_NBP_HISTORY_RATE: process.env.API_NBP_HISTORY_RATE,
  API_NBP_RATE: process.env.API_NBP_RATE,
  API_NBP_GOLD: process.env.API_NBP_GOLD,
})