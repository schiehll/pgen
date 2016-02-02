var path = require('path');
var webpack = require('webpack');
var glob = require("glob");

module.exports = {
  target: 'node',
  devtool: 'eval',

  entry: {
    test: process.env.TESTING ? glob.sync('./test/**/*.js') : glob.sync('./test/**/*.test.go.js')
  },
  
  output: {
    path: path.join(__dirname, 'dist/test'),
    filename: 'test.js',
    publicPath: '/dist/test/'
  },
  
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('test')
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js?/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'test')]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        include: path.join(__dirname, 'src/assets/img'),
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  externals: {
    'cheerio': 'global',
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  },

  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js', '.jsx']
  }
};

