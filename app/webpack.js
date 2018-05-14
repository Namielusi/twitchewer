/* eslint-disable import/no-extraneous-dependencies */
const webpackConfig = require('../webpack.config');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig);

module.exports = middleware(compiler);
