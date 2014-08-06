/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var noop = require('react/lib/emptyFunction');
var SCUtil = require('./util/SCUtil');
var Display = require('./lib/Display');
var sc;

/**
 * Placeholder stream
 */

var dummyStream = {
  durationEstimate: 0,
  position: 0
};

/**
 * SoundCloud component
 */

var SoundCloud = React.createClass({
  getInitialState: function() {
    return {
      track: undefined,
      stream: dummyStream
    };
  },

  componentDidMount: function() {
    sc = new SCUtil(this.props.clientId);
    this._loadTrack(this.props.url);
  },

  componentWillReceiveProps: function(newProps) {
    var newUrl = newProps.url;
    if (this._isNewUrl(newUrl)) {
      this._loadTrack(newUrl);
    }
  },

  /**
   * Load a new player
   *
   * @param {string} url
   */

  _loadTrack: function(url) {
    this._prepareForNewTrack();
    var _this = this;
    sc.load(url, function(track, stream) {
      _this._bindEvents(stream);
      _this.setState({track: track, stream: stream});
    });
  },

  /**
   * Clean up before loading a new track
   */

  _prepareForNewTrack: function() {
    if (this.state.stream.destruct) {
      this.state.stream.destruct();
      this.setState({stream: dummyStream});
    }
  },

  /**
   * Bind events to new stream. Has to be done
   * through the play method, as SoundManager doesn't
   * stream bindings outside of certain contexts.
   *
   * @param {object} newStream
   */
  
  _bindEvents: function(stream) {
    stream.play({
      onplay: this.props.onPlay || noop,
      onpause: this.props.onPause || noop,
      onfinish: this.props.onEnd || noop,
      whileplaying: this._updateProgress
    });
    stream.pause();
  },

  /**
   * Determine if url is already loaded
   *
   * @param {string} url
   */

  _isNewUrl: function(url) {
    if (!this.state.track) return false;
    var currentUrl = this.state.track.permalink_url.split('://')[1];
    var newUrl = url.split('://')[1];
    return currentUrl !== newUrl;
  },

  /**
   * Determine if current stream is playing
   */
  
  _isPlaying: function() {
    return this.state.stream && this.state.stream.paused !== undefined && !this.state.stream.paused;
  },

  /**
   * Toggle pause/play on current stream
   * Must force an update, isPlaying is only calculated on render.
   */
  
  _togglePlayback: function() {
    this.state.stream.togglePause();
    this.forceUpdate();
  },

  /**
   * Force duration & position props passed to display to update.
   */
  
  _updateProgress: function() {
    this.forceUpdate();
  },

  /**
   * Skip to a certain part of the track
   *
   * @param {number} newPosition
   */

  _setPosition: function(newPosition) {
    this.state.stream.setPosition(newPosition);
  },

  render: function() {
    return <Display track={this.state.track}
                    duration={this.state.stream.durationEstimate}
                    position={this.state.stream.position}
                    togglePlayback={this._togglePlayback}
                    isPlaying={this._isPlaying()}
                    setPosition={this._setPosition}/>
  }
});

/**
 * Expose SoundCloud component
 */

module.exports = SoundCloud;
