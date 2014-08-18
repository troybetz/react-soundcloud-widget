/**
 * Module dependencies
 */

var keyMirror = require('react/lib/keyMirror');

/**
 * Constants used for communication between ActionCreators & Stores
 */

module.exports = {
  ActionTypes: keyMirror({
    LOAD_TRACK: null,
    RECEIVE_TRACK_INFO: null,
    RECEIVE_STREAM_INFO: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    EXTERNAL_ACTION: null
  })
};