/* eslint-disable no-console */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

//! Note : Alias and Rules are the same for Storybook Webpack configuration

let envKeys = {};
try {
  const env = dotenv.config().parsed;

  envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  console.log('Loaded Environment variable from .env');
} catch (error) {
  console.log('.env File Not Found');
}

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      // assets: path.resolve("../src/assets"),
      assets: path.resolve(__dirname, '..', 'src', 'assets'),
      components: path.resolve(__dirname, '..', 'src', 'components'),
      styles: path.resolve(__dirname, '..', 'src', 'styles'),
      stories: path.resolve(__dirname, '..', 'src', 'stories'),
      utils: path.resolve(__dirname, '..', 'src', 'utils'),
    },
  },
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(c|sc)ss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        enforce: 'pre',
        loader: require.resolve('@svgr/webpack'),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, 'source'), to: 'dest', noErrorOnMissing: true }],
    }),
    new DefinePlugin(envKeys),
  ],
};
