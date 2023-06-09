const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
module.exports = {
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      process: { env: { BASE_URL: `"${process.env.BASE_URL}"` } }

    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};