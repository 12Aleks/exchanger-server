import * as process from 'node:process';

export default () => ({
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  API_KEY: process.env.API_KEY,
  API_URL: process.env.API_URL,
})