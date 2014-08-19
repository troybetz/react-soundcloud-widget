/**
 * Module dependencies
 */

var keyMirror = require('react/lib/keyMirror');

/**
 * Constants used for communication between ActionCreators & Stores
 */

module.exports = {
  ActionTypes: keyMirror({
    UPDATE_TRACK: null,
    RECEIVE_TRACK_INFO: null,
    RECEIVE_STREAM_INFO: null,
    TOGGLE_PAUSE: null,
    SKIP_TO: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    EXTERNAL_ACTION: null
  })
};