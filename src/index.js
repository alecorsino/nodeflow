// require('./styles/main.styl');

// require('./html/about.html'); //
// require('./index.html'); //

require.context("./", true, /^\.\/.*\.html$/); // require('./html/someView.html');

/*
*
*
* If you need to add a new HTML page use require('path/to/file.html')
* or use Webpack's require.context instead (preffered way).
* This will trigger Webpack to move files to your build dir
*
*
*/

var logger = new (require('./js/util/Logger'))();
logger.debug('Webpack rules...');
