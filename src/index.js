/*
*
* Use Webpack's require.context (preffered way).
* Also to add a new HTML page use require('path/to/file.html')
* This will trigger Webpack to move files to your build dir
*
*/

/*
*  Will process all HTML files and assets referenced inside
*  like styles and images. This will create hashed file name of assets.
*/
require.context("./", true, /^\.\/.*\.html$/);



var logger = new (require('./js/util/Logger'))();
logger.debug('Webpack rules...');
