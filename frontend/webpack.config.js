"use strict";

const path = require("path");

module.exports = {
  // Set debugging source maps to be "inline" for
  // simplicity and ease of use (makes very big files)
  devtool: "inline-source-map",
  mode: "development",
  // mode: "production",
  // The application entry point
  entry: {
    index: {import: "./scripts/index.tsx"},
    prerender: {import: "./scripts/ServerRender.ts"}
  },

  // Where to compile the bundle
  // By default the output directory is `dist`
  // need to output two bundles: index.js from index.tsx and other.js from other.tsx
  output: {
    path: path.resolve(path.resolve(), "../public/scripts"),
    filename: "[name].js"
  },

  // Supported file loaders
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  stats: 'normal',
  // File extensions to support resolving
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }

};
