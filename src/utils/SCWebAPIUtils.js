/**
 * Module dependencies
 */

var SCStream = require('sc-stream');
var sc;

/**
 * SCWebAPIUtils
 *
 * Interface to SoundCloud API
 */

module.exports = {

  /**
   * Register new SoundCloud API client
   *
   * @param {String} clientId
   */
  
  register: function(clientId) {
    sc = new SCStream(clientId);
  }
};