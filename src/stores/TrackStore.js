/**
 * Module dependencies
 */

var SCAppDispatcher = require('../dispatcher/SCAppDispatcher');
var SCConstants = require('../constants/SCConstants');
var SCWebAPIUtils = require('../utils/SCWebAPIUtils');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = SCConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _track = {};

/**
 * Load new track into store
 *
 * @param {Object\String} track
 */

function load(trackInfo) {
  _track = trackInfo;
}

/**
 * Track Store
 *
 * Holds current track information
 */

var TrackStore = merge(EventEmitter.prototype, {

  /**
   * @param {function} callback
   */

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Notify listeners of change
   */
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  get: function() {
    return _track;
  }
});

/**
 * Register TrackStore with Dispatcher
 */

TrackStore.dispatchToken = SCAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_TRACK_INFO:
      load(action.trackInfo);
      TrackStore.emitChange();
      break;

    default:
      // nada.
  }
});

/**
 * Expose TrackStore
 */

module.exports = TrackStore;