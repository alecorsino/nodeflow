var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

console.log(__dirname);
module.exports = {
  // context: path.join(__dirname, 'src'),
  debug: true,
  devtool: '#source-map',
  stats: {
      // Configure the console output
      progress:true,
      colors: true,
      modules: true,
      reasons: true
  },
  entry: [
    './src/main.js'
  ],

  output: {
    path: path.join(__dirname, 'www'),
    // publicPath: '/',
    filename: 'scripts/bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  }
};



/*
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/scripts.js",
  output: {
    path: __dirname + "/js",
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

// Just run webpack and it will produce unminified output with sourcemaps.
// Run NODE_ENV=production webpack and it will minify the output and de-dupe all the unnecessary code.
*/
