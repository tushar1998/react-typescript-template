import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServer } from 'webpack-dev-server';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DotEnvWebpackPlugin from 'dotenv-webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default ({ env }: { env: string }) => {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';

  const Terser = new TerserWebpackPlugin({ terserOptions: { compress: true } });

  const DotEnv = new DotEnvWebpackPlugin({
    /**
     * systemvars: true
     * load all the predefined 'process.env' variables which will
     * trump anything local per dotenv specs. (useful for CI purposes)
     */
    systemvars: true,
    safe: true, // load '.env.example' to verify the '.env' variables are all set.
    path: path.join(__dirname, `.env.${process.env.APP_ENV || 'local'}`),
  });

  const MiniCss = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  });

  const Html = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public', 'index.html'),
  });

  const ReactRefresh = new ReactRefreshWebpackPlugin({ overlay: false });

  const Copy = new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, 'public', 'favicon.ico'),
        to: path.join(__dirname, 'build'),
      },
    ],
  });

  const ForkTS = new ForkTsCheckerWebpackPlugin({
    async: isEnvDevelopment,
    typescript: {
      enabled: true,
      configFile: path.join(__dirname, 'tsconfig.json'),
      mode: 'write-references',
    },
    logger: { infrastructure: 'webpack-infrastructure', issues: 'console', devServer: true },
  });

  return {
    target: 'web',
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    entry: { main: path.join(__dirname, 'src', 'index.tsx'), vendor: ['react', 'react-dom'] },
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    stats: isEnvDevelopment ? 'minimal' : isEnvProduction && 'normal',
    output: {
      clean: true,
      path: path.join(__dirname, 'build'),
      filename: 'js/[name].[chunkhash].js',
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [Terser],
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        assets: path.resolve(__dirname, 'src', 'assets'),
        components: path.resolve(__dirname, 'src', 'components'),
        styles: path.resolve(__dirname, 'src', 'styles'),
        stories: path.resolve(__dirname, 'src', 'stories'),
        utils: path.resolve(__dirname, 'src', 'utils'),
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
      },
      devMiddleware: { publicPath: path.join(__dirname, 'public') },
      port: 3000,
    } as DevServer,
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', { regenerator: true }],
              isEnvDevelopment && 'react-refresh/babel',
              'babel-plugin-styled-components',
            ].filter(Boolean),
            babelrc: false,
          },
        },
        {
          test: /\.(c|sc)ss$/,
          use: isEnvDevelopment
            ? ['style-loader', 'css-loader']
            : isEnvProduction && [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.svg$/,
          loader: '@svgr/webpack',
          enforce: 'pre',
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      Html,
      DotEnv,
      Copy,
      isEnvProduction && MiniCss,
      isEnvDevelopment && ReactRefresh,
      isEnvDevelopment && ForkTS,
    ].filter(Boolean),
  } as Configuration;
};
