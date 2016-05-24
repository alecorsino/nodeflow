var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var path = require('path');

console.log(__dirname);
module.exports = {
  debug: true,
  devtool: '#source-map',
  stats: {
      // Configure the console output
      progress:true,
      colors: true,
      modules: true,
      reasons: true
  },
  entry: {
    index: './src/index.js',
    about: './src/js/about.js'

  },

  output: {
    path: path.join(__dirname, 'www'),
    publicPath: '/',
    filename: 'scripts/[name].js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('scripts/common.js'),
    new BrowserSyncPlugin({
      server: 'www',
      open: true,
      logFileChanges: true
      // plugins: ['bs-fullscreen-message'],
    })
  ],

  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=[path][hash].[ext]&context=./src'  // inline base64 URLs for <=8k images, direct URLs for the rest
      },

      // { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.styl$/,
        loaders: [ 'file?name=[path][hash].css&context=./src',
                  'extract',
                  'css-loader',
                  'stylus-loader'
                                  ]
      },
      { test: /\.html$/,
        loaders: [ 'file?name=[path][name].[ext]&context=./src',
                   'extract',
                  'html?attrs=img:src link:href&root=/'
                 ]
      }
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
