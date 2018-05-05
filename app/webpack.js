/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const Dotenv = require('dotenv-webpack');

const compiler = webpack({
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/index.js',
  ],
  output: {
    path: `${__dirname}/static`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        }, 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Actions: path.resolve(__dirname, 'actions/'),
      Reducers: path.resolve(__dirname, 'reducers/'),
      Lib: path.resolve(__dirname, 'lib/'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
  devtool: 'source-map',
});

module.exports = middleware(compiler);
