
'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './browser/assets/js/app.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
