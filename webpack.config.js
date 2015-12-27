var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./src/app.jsx",
  output: {
    path: "./dist",
    filename: "app.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    fallback: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        exclude: /(node_modules)/
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  devtool: 'source-maps',
  resolveLoader: { root: path.join(__dirname, "node_modules") }
};
