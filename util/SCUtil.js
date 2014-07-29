/**
 * Module dependencies
 */

var sdk = require('require-sdk')('http://connect.soundcloud.com/sdk.js', 'SC');

/**
 * Layer over SoundCloud JS SDK, purely for
 * streaming purposes.
 *
 * @param {string} clientId
 */

function SCUtil(clientId) {
  this.registerClient(clientId);
}

/**
 * Creates and returns new stream & track information
 *
 * @param {string} url
 * @param {function} cb
 * @api public
 */

SCUtil.prototype.load = function(url, cb) {
  var _this = this;
  this.getTrackInfo(url, function(trackInfo) {
    _this.createStream(trackInfo.stream_url, function(stream) {
      return cb(trackInfo, stream);
    });
  });
};

/**
 * Register new SoundCloud API Client
 *
 * @param {string} clientId
 * @api private
 */

SCUtil.prototype.registerClient = function(clientId) {
  sdk(function(err, sc) {
    sc.initialize({client_id: clientId});
  });
};

/**
 * Create new audio stream
 *
 * @param {string} streamUrl specially formatted SoundCloud URL
 * @param {function} cb 
 * @api private
 */

SCUtil.prototype.createStream = function(streamUrl, cb) {
  sdk(function(err, sc) {
    sc.stream(streamUrl, cb);
  });
};

/**
 * Retrieve track information from SoundCloud
 *
 * @param {string} url
 * @param {function} cb
 * @api private
 */

SCUtil.prototype.getTrackInfo = function(url, cb) {
  sdk(function(err, sc) {
    sc.get('/resolve', {url: url}, cb);
  });
};

/**
 * Expose SCUtil
 */

module.exports = SCUtil;
