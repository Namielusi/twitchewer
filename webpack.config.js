const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/index.js',
  ],
  output: {
    path: `${__dirname}/app/static`,
    publicPath: '/',
    filename: 'bundle.js',
  },
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
      Actions: path.resolve(__dirname, 'app/actions/'),
      Reducers: path.resolve(__dirname, 'app/reducers/'),
      Lib: path.resolve(__dirname, 'app/lib/'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './app/static',
    overlay: true,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/proxy/api': {
        target: 'http://api.twitch.tv',
        changeOrigin: true,
        pathRewrite: { '^/proxy/api': '/api' },
      },
      '/proxy/usher': {
        target: 'http://usher.twitch.tv',
        changeOrigin: true,
        pathRewrite: { '^/proxy/usher': '' },
      },
      '/proxy/vod': {
        target: 'https://vod-metro.twitch.tv',
        changeOrigin: true,
        pathRewrite: { '^/proxy/vod': '' },
      },
    },
  },
};
