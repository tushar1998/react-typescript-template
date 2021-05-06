const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  // incase failures for webpack react-refresh add HotModuleReplacementPlugin
  plugins: [new ReactRefreshWebpackPlugin()],
};
