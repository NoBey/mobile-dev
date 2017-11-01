
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './example/src/main.js',
  output: {
    path: path.join(__dirname, 'example/build'),
       filename: 'index.js'
  },
  // externals: {
  //   'React': 'react'
  // },
  module: {
    rules: [{
          test: /\.js(.*)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ['latest', 'stage-0', 'react']
          }
        }]
  },
  devServer: {
  contentBase: path.join(__dirname, "example/build"),
  compress: true,
  host:'0.0.0.0',
  port: 9000
}
}
