/**
 * Module dependencies
 */

var SCStream = require('sc-stream');
var SCExternalActionCreators = require('../actions/SCExternalActionCreators');
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
  },

  /**
   * Load track & stream info into the player
   *
   * @param {Object} track
   */

  load: function(track) {
    sc.stream(track).then(function(response) {
      SCExternalActionCreators.receiveTrackInfo(response.track);
      response.stream.then(function(stream) {
        SCExternalActionCreators.receiveStreamInfo(stream);
      });
    });
  }
};