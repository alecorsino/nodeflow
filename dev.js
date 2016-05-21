var bs   = require('browser-sync').create();
var webpack       = require('webpack');

var stripAnsi     = require('strip-ansi');
var webpackConfig = require('./webpack.config');
var bundler       = webpack(webpackConfig);

var watch         = require('watch');
var path = require('path');

bundler.plugin('done', function (stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return bs.sockets.emit('fullscreen:message', {
      title: "Webpack Error:",
      body:  stripAnsi(stats.toString()),
      timeout: 100000
    });
  }
  // bsReload();
});

   function bundle(){
     console.log('Webpack is packing..');
     bundler.run(function(err, stats) {

     });
   };

  function bsReload(){
     console.log('Reloading...please wait!');
    //  bs.notify('Reloading...please wait!');
     bs.reload();
  };


  bs.init({
    server: 'www',
    open: true,
    logFileChanges: false,
    plugins: ['bs-fullscreen-message']

  });

  watch.createMonitor(path.join(__dirname, 'src/'), function (monitor) {
      // monitor.files['/home/mikeal/.zshrc'] // Stat object for my zshrc.
      monitor.on("changed", function (f, curr, prev) {
        bundle();
        bsReload();
      })
      monitor.on("created", function (f, stat) {
        bundle();
        bsReload();
      })
      monitor.on("removed", function (f, stat) {
        bundle();
        bsReload();
      })
      // monitor.stop(); // Stop watching

  });

  watch.createMonitor(path.join(__dirname, 'www/'), function (monitor) {
      monitor.on("created", function (f, stat) {
        bsReload();
      })
      monitor.on("removed", function (f, stat) {
        bsReload();
      })
  });
