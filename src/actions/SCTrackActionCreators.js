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

  loadTrack: function(track) {
    SCAppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_TRACK,
      track: track
    });
    SCWebAPIUtils.load(track);
  }
};