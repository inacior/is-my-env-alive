const path = require('path');
const webpack = require('webpack');

module.exports = {  
  entry: {
    'check': './lib/check.js',
    'command': './lib/command.js'
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      test: 'command'
    }),
]
}