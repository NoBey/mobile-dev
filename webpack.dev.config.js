
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
        },{
          test: /\.css$/,
          use: ['style-loader', 'css-loader?modules']
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        }
      ]
  },
  devServer: {
  contentBase: path.join(__dirname, "example/build"),
  compress: true,
  host:'0.0.0.0',
  port: 9000
}
}
