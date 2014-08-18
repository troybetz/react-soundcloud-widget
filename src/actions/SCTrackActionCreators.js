/**
 * Module dependencies
 */

var SCWebAPIUtils = require('../utils/SCWebAPIUtils');
var SCAppDispatcher = require('../dispatcher/SCAppDispatcher');
var SCConstants = require('../constants/SCConstants');

var ActionTypes = SCConstants.ActionTypes;

/**
 * Actions involving current track
 */

module.exports = {

  /**
   * Force new track information to be loaded.
   *
   * @param {String|Object} track
   */

  load: function(track) {
    SCWebAPIUtils.load(track);
  },

  /**
   * Check if passed in track is different from current one.
   *
   * @param {Object} track
   */

  checkTrack: function(track) {
    SCAppDispatcher.handleViewAction({
      type: ActionTypes.CHECK_TRACK,
      track: track
    });
  }
};