/* eslint-disable no-console */
const dotenv = require('dotenv');
const path = require('path');
const { DefinePlugin } = require('webpack');

let envKeys = {};
try {
  const env = dotenv.config({ path: path.join(__dirname, '..', '.env.production') }).parsed;
  envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  console.log('Loaded environment variable from .env.production');
} catch (error) {
  console.log('.env.production file Not Found');
}

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'normal',
  plugins: [new DefinePlugin(envKeys)],
};
