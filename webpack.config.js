const path = require('path');

module.exports = {
  entry: './server.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
    module: {
    rules: [
      { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
  }
};