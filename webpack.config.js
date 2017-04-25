var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');


module.exports = {
  devtool: '#source-map',
  stats: {
      errors:true,
      progress:true,
      colors: true,
      modules: true,
      reasons: true
  },

  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'scripts/[name].js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.jsx|\.js)$/,
        exclude: [ node_modules ],
        loader: 'eslint-loader',
        options: {
          fix: true,
        }
      },
        {
          test: /(\.jsx|\.js)$/,
          exclude: [ node_modules ],
          use: [
                {loader:'babel-loader'}
          ]
        }
    ]
  },
  resolve:{
    modules:[path.resolve('./src'),'node_modules']
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('scripts/common.js'),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      inject:'body'
    }),
    new BrowserSyncPlugin({
      server: 'dist',
      open: true,
      logFileChanges: true
      // plugins: ['bs-fullscreen-message'],
    })
  ]
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
