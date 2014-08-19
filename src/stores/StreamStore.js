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

var _stream = {};
var _eventsBound = false;

/**
 * Load new stream into store
 *
 * @param {Object\String} stream
 */

function load(streamInfo) {
  _stream = streamInfo;
}

/**
 * Reset everything back to defaults.
 */

function reset() {
  if (_stream.destruct) {
    _stream.destruct();
    _stream = {};
    _eventsBound = false;
  }
}

/**
 * Called on very first play of each track.
 */

function bindAndPlay() {
  _stream.play({
    whileplaying: updateProgress
  });
  _eventsBound = true;
}

function updateProgress() {
  StreamStore.emitChange();
}

function togglePause() {
  if (!_stream.togglePause) return;
  if (!_eventsBound) return bindAndPlay();
  _stream.togglePause();
}

function setPosition(position) {
  if (_stream.setPosition) {
    _stream.setPosition(position);
  }
}

/**
 * Stream Store
 *
 * Manages current audio stream
 */

var StreamStore = merge(EventEmitter.prototype, {

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
    return {
      isPlaying: !_stream.paused && !!_stream.playState,
      duration: _stream.durationEstimate ? _stream.durationEstimate : 1,
      position: _stream.position ? _stream.position : 0
    };
  }
});

/**
 * Register StreamStore with Dispatcher
 */

StreamStore.dispatchToken = SCAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.UPDATE_TRACK:
      reset();
      StreamStore.emitChange();
      break;

    case ActionTypes.RECEIVE_STREAM_INFO:
      load(action.streamInfo);
      StreamStore.emitChange();
      break;

    case ActionTypes.TOGGLE_PAUSE:
      togglePause();
      StreamStore.emitChange();
      break;
    
    case ActionTypes.SKIP_TO:
      setPosition(action.position);
      StreamStore.emitChange();
      break;

    default:
      // nada.
  }
});

/**
 * Expose StreamStore
 */

module.exports = StreamStore;