/* eslint-disable no-console */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');

const APP_ENV = process.env.APP_ENV || 'local';

const DotEnvWebPackPlugin = new DotEnv({
  systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs. (useful for CI purposes)
  safe: true, // load '.env.example' to verify the '.env' variables are all set.
  path: path.join(__dirname, '..', `.env.${APP_ENV}`),
});

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
  devServer: { port: 3000 },
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
    clean: true,
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, 'source'), to: 'dest', noErrorOnMissing: true }],
    }),
    DotEnvWebPackPlugin,
  ],
};
