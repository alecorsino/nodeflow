require('./styles/style.css');
require('./styles/main.styl');

require('./index.html'); //
require('./html/someView.html');

/*
* Configure all your website from this file.
*
* If you need to add a new HTML page use require('path/to/file.html')
* this will trigger Webpack to move files to your build dir
*
*
*/

var logger = new (require('./js/Logger'))();
logger.debug('Webpack rules...');
