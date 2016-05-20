var Logger = function (){

};
//TODO: return NOP functions when in Logger is switched off

Logger.prototype.LOG = function (lvl,msg) {
  console.log([Date(),lvl||'',msg].join(' ')  );
};
Logger.prototype.log = function (msg) {
  this.LOG(null,msg);
};

Logger.prototype.debug = function (msg) {
  this.LOG('DEBUG: ',msg);
};

Logger.prototype.error = function (msg) {
  this.log('DEBUG: ',msg);
};

module.exports = Logger;
