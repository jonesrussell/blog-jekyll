const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    path: path.resolve(__dirname, "./src/assets/js/")
  },
  output: {
    path: path.resolve(__dirname, "./_site/main.js")
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

