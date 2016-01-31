var webpack = require('webpack');
var config = require('./webpack.config.base');

config.entry.app.push('webpack-hot-middleware/client');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
