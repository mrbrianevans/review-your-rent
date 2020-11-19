"use strict";

const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    linkType: 'text/css'
  })],
  // Set debugging source maps to be "inline" for
  // simplicity and ease of use
  devtool: "inline-source-map",

  // The application entry point
  entry: "./scripts/index.tsx",

  // Where to compile the bundle
  // By default the output directory is `dist`

  output: {
    path: path.resolve(path.resolve(), "../public"),
    filename: "scripts.js"
  },

  // Supported file loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },

  // File extensions to support resolving
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"]
  }
};
