/**
 * Module dependencies
 */

var SCWebAPIUtils = require('../utils/SCWebAPIUtils');
var SCAppDispatcher = require('../dispatcher/SCAppDispatcher');
var SCConstants = require('../constants/SCConstants');

var ActionTypes = SCConstants.ActionTypes;

/**
 * Actions involving current audio stream
 */

module.exports = {
  
  togglePause: function() {
    SCAppDispatcher.handleViewAction({
      type: ActionTypes.TOGGLE_PAUSE
    });
  }
};