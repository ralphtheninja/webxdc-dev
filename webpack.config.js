const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    // produce both frontend bundle as well as simulator webxdc bundle
    frontend: "./frontend/index.tsx",
    webxdc: "./sim/webxdc.ts",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "babel-preset-solid"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    // create a directory per bundle so we can layer frontend separately
    filename: "[name]/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    // clean assets, except backend which is generated by typescript
    clean: {
      keep: "backend",
    },
  },
  plugins: [
    // produce index.html with only frontend.js script injected
    new HtmlWebpackPlugin({
      title: "webxdc-dev",
      template: "./frontend/index.html",
      chunks: ["frontend"],
    }),
  ],
};
