const path = require('path');
const webpack = require('webpack');
require('dotenv').config(); // eslint-disable-line

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
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
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
        use: ['babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.global\.(scss|sass)$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        }, 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.global\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
      Layout: path.resolve(__dirname, 'app/imports/layout/'),
      Imports: path.resolve(__dirname, 'app/imports/'),
      Actions: path.resolve(__dirname, 'app/actions/'),
      Reducers: path.resolve(__dirname, 'app/reducers/'),
      Lib: path.resolve(__dirname, 'app/lib/'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
      'process.env.API_SCOPE': JSON.stringify(process.env.API_SCOPE),
      'process.env.OAUTH_REDIRECT': JSON.stringify(process.env.OAUTH_REDIRECT),
    }),
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
        target: 'https://api.twitch.tv',
        changeOrigin: true,
        pathRewrite: { '^/proxy/api': '/api' },
      },
      '/proxy/usher': {
        target: 'https://usher.twitch.tv',
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
