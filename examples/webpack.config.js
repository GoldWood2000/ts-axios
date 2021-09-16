const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// console.log(fs.readdirSync(__dirname).reduce((entries, dir) => {
//   const fullDir = path.join(__dirname, dir)
//   console.log(fullDir);
//   const entry = path.join(fullDir, 'app.ts')
//   if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
//     entries[dir] = ['webpack-hot-middleware/client', entry]
//   }

//   return entries
// }, {}));

module.exports = {
  mode: 'development',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            loader: 'tslint-loader'
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}