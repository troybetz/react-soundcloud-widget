/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var noop = require('react/lib/emptyFunction');
var SCStream = require('../sc-stream');
var Display = require('./lib/Display');
var sc;

/**
 * SoundCloud component
 */

var SoundCloud = React.createClass({
  getInitialState: function() {
    return {
      track: undefined,
      stream: undefined,
      eventsBound: false
    };
  },

  componentDidMount: function() {
    sc = new SCStream(this.props.clientId);
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
    var _this = this;
    this._prepareForNewTrack();

    sc.stream(url).then(function(response) {
      _this.setState({track: response.track});
      response.stream.then(function(stream) {
        _this.setState({stream: stream});
      });
    }).catch(function(e) { console.log(e); });
  },

  /**
   * Clean up before loading a new track
   */

  _prepareForNewTrack: function() {
    var stream = this.state.stream;
    if (stream) {
      stream.destruct();
      this.setState({stream: undefined, track: undefined, eventsBound: false});
    }
  },

  /**
   * Bind events to new stream. Has to be done
   * through the play method, as SoundManager doesn't
   * stream bindings outside of certain contexts.
   */
  
  _bindEvents: function() {
    var stream = this.state.stream;
    stream.play({
      onplay: this.props.onPlay || noop,
      onpause: this.props.onPause || noop,
      onfinish: this.props.onEnd || noop,
      whileplaying: this._updateProgress
    });
    stream.pause();
    this.setState({eventsBound: true});
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
   * Toggle pause/play on current stream
   * Must force an update, isPlaying is only calculated on render.
   */
  
  _togglePlayback: function() {
    if (!this.state.eventsBound) this._bindEvents();
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
    var stream = this.state.stream;
    var streamLoaded = stream !== undefined;
    var isPlaying;
    var duration;
    var position;

    if (streamLoaded) {
      duration = stream.durationEstimate ? stream.durationEstimate : 100;
      position = stream.position ? stream.position : 0;
      isPlaying = position && !stream.paused;
    } else {
      isPlaying = false;
      duration = 100;
      position = 0;
    }

    return <Display track={this.state.track}
                    duration={duration}
                    position={position}
                    togglePlayback={this._togglePlayback}
                    isPlaying={isPlaying}
                    streamLoaded={streamLoaded}
                    setPosition={this._setPosition}/>
  }
});

/**
 * Expose SoundCloud component
 */

module.exports = SoundCloud;
