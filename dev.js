// Alternative worlflow configuration
// Using as well Browsersync
// Not being used. So IGNORE THIS FILE.
// KEPT for reference.

var bs = require('browser-sync').create();
var webpack = require('webpack');

var stripAnsi = require('strip-ansi');
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

var watch = require('watch');
var path = require('path');

/*
* Display error in browser if webpack fails
*/
bundler.plugin('done', function(stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return bs.sockets.emit('fullscreen:message', {
            title: "Webpack Error:",
            body: stripAnsi(stats.toString()),
            timeout: 100000
        });
    }
});

function bundle() {
    console.log('Webpack is packing..');
    bundler.run(function(err, stats) {
    });
};

function bsReload() {
    console.log('Reloading...please wait!');
    bs.reload();
};


/*
* Watch  Source dir and trigger webpack
*/
watch.createMonitor(path.join(__dirname, 'src/'), function (monitor) {
    monitor.on("changed", function (f, curr, prev) {
      bundle();
    })
    monitor.on("created", function (f, stat) {
      bundle();
    })
    monitor.on("removed", function (f, stat) {
      bundle();
    })
    // monitor.stop(); // Stop watching
});

bundle();

// bs.watch('www').on('change', bsReload);
bs.init({
    server: 'www',
    open: true,
    logFileChanges: true,
    plugins: ['bs-fullscreen-message'],
    files: [
            {
                match: ["./www/**/*"],
                fn: function (event, file) {
                  console.log(event+" : "+file);
                    bsReload()
                },
                options: {
                    // ignored: '*.txt'
                }
            }
    ]
});

// bsReload();
