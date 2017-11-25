const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: "umd"
  },
  externals: ['react'],
  module: {
    rules: [
      {
        test: /\.js(.*)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            'react', 'stage-0', 'latest'
          ],
          plugins: [
            ["transform-decorators-legacy"]
          ]
        }

      }, {
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
  }
}
