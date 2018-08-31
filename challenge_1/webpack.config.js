const path = require('path');

const entryPoint = path.join(__dirname, '/client');
const outputDir = path.join(__dirname, '/public');
module.exports = {
  mode: 'development',
  // where webpack begins bundling
  entry: `${entryPoint}/app.jsx`,
  // output of the webpack files
  output: {
    // absolute path (target diretory)
    path: outputDir,
    // filename
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env'],
        },
      }],
  },
};
