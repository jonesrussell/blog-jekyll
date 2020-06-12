const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    homepage: "./foobar.js"
  },
  output: {
    path: path.resolve(__dirname, "./src/assets/js/")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};

