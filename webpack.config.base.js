var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',

  entry: {
    app: [
      './src/index'
    ]
  },
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'pgen.js',
    publicPath: '/dist/'
  },
  
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css")
  ],

  module: {
    loaders: [
      {
        test: /\.js?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      { 
        test: /\.styl$/,
        include: path.join(__dirname, 'src/assets/styles'),
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus') 
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        include: path.join(__dirname, 'src/assets/fonts'),
        loader: 'file'
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        include: path.join(__dirname, 'src/assets/img'),
        loader: 'file'
      }
    ]
  },

  postcss: () => {
    return [autoprefixer];
  },

  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js', '.jsx', '.css', '.styl']
  }
};
