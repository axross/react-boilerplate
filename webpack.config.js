const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

require("dotenv").config();

const config = ["SESSION_ENCRYPTION_KEY", "SESSION_STORE_KEY"].reduce(
  (whole, key) => ({ ...whole, [key]: process.env[key] }),
  {}
);

module.exports = {
  entry: {
    main: "./src/main.ts"
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "[name].js",
    chunkFilename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Loading...",
      template: "./src/index.html",
      hash: true,
      config
    })
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  }
};
