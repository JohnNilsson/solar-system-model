const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDir = "dist";

let devtool = null;
if (process.env.NODE_ENV !== "production") {
  devtool = "inline-source-map";
}

module.exports = {
  entry: "./src/index",
  devtool,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new HtmlWebpackPlugin({
      title: "Solar System Model"
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, outputDir)
  }
};
