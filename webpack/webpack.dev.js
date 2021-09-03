/* eslint-disable no-console */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: { hot: true },
  devtool: 'cheap-module-source-map',
  stats: 'minimal',
  // incase failures for webpack react-refresh add HotModuleReplacementPlugin
  plugins: [new ReactRefreshWebpackPlugin()],
};
