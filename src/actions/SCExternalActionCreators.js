/**
 * Module dependencies
 */

var SCWebAPIUtils = require('../utils/SCWebAPIUtils');
var SCAppDispatcher = require('../dispatcher/SCAppDispatcher');
var SCConstants = require('../constants/SCConstants');

var ActionTypes = SCConstants.ActionTypes;

/**
 * Actions involving SoundCloud API
 */

module.exports = {

  /**
   * Receive new track information from SoundCloud
   *
   * @param {Object} trackInfo
   */
  
  receiveTrackInfo: function(trackInfo) {
    SCAppDispatcher.handleExternalAction({
      type: ActionTypes.RECEIVE_TRACK_INFO,
      trackInfo: trackInfo
    });
  },

  /**
   * Receive new stream information from SoundCloud
   *
   * @param {Object} streamInfo
   */
  
  receiveStreamInfo: function(streamInfo) {
    SCAppDispatcher.handleExternalAction({
      type: ActionTypes.RECEIVE_STREAM_INFO,
      streamInfo: streamInfo
    });
  }
};