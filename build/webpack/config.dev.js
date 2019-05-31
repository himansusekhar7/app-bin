/**
 * webpack.config.dev.js
 * @author Himansu Boity
 * @since 05.30.2019
 * @version 1.0.0
 */

const path = require('path');

// plugins
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');


const configuration = {
  mode: process.env.mode || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins:[ new cleanWebpackPlugin(), new htmlWebpackPlugin({
    template: './src/templates/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};

module.exports = configuration;