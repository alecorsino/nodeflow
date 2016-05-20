var browserSync   = require('browser-sync').create();
var webpack       = require('webpack');

var stripAnsi     = require('strip-ansi');
var webpackConfig = require('./webpack.config');
var bundler       = webpack(webpackConfig);


bundler.plugin('done', function (stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      title: "Webpack Error:",
      body:  stripAnsi(stats.toString()),
      timeout: 100000
    });
  }
  bsReload();
});



 function bundle(){
   console.log('Webpack is packing...');
   bundler.run(function(err, stats) {
   });
 };

 function bsReload(){
   console.log('BrowserSync is reloading...');
   browserSync.reload();
 };


browserSync.watch("src", function (event, file) {
    if (event === "change") {
      bundle();
    }
});

browserSync.init({
    server: 'www',
    open: true,
    logFileChanges: false,
    plugins: ['bs-fullscreen-message'],
    files: [
        'www/css/*.css',
        'www/*.html'
    ]
});

bundle();
// bsReload();
