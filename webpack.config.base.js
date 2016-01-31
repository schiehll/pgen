var path = require('path');
var webpack = require('webpack');
var webpackUMDExternal = require('webpack-umd-external');

module.exports = {
  devtool: 'eval',

  entry: {
    app: [
      './src/index'
    ]
  },
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'pgen.js',
    publicPath: '/dist/',
    devtoolModuleFilenameTemplate: '../[resource-path]',
    libraryTarget: 'umd',
    library: 'pgen'
  },
  
  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(svg)$/,
        include: path.join(__dirname, 'src/assets/img'),
        loader: 'url'
      }
    ]
  },

  externals: webpackUMDExternal({
    'react': 'react',
    'react-dom': 'react-dom'
  }),

  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js']
  }
};
