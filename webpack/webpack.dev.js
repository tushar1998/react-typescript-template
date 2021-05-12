/* eslint-disable no-console */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

let envKeys = {};
try {
  const env = dotenv.config({ path: path.join(__dirname, '..', '.env.development') }).parsed;

  envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  console.log('Loaded environment variable from .env.development');
} catch (error) {
  console.log('.env.development file Not Found');
}

module.exports = {
  mode: 'development',
  devServer: { hot: true },
  devtool: 'cheap-module-source-map',
  stats: 'minimal',
  // incase failures for webpack react-refresh add HotModuleReplacementPlugin
  plugins: [new ReactRefreshWebpackPlugin(), new DefinePlugin(envKeys)],
};
