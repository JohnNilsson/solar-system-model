const HtmlWebpackPlugin = require('html-webpack-plugin');

let devtool = null;
if (process.env.NODE_ENV !== "production") {
  devtool = "inline-source-map";
}

let mode = 'production';
if (process.env.NODE_ENV !== "production") {
  mode = 'development';
}

module.exports = {
  entry: "./src/index",
  devtool,
  mode,
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
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Solar System Model"
    })
  ]
};
