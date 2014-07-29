/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var SCUtil = require('./util/SCUtil');
var Display = require('./lib/Display');
var sc;

function noop() {}

/**
 * SoundCloud component
 */

var SoundCloud = React.createClass({
  getInitialState: function() {
    return {
      track: undefined,
      stream: undefined
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
    if (this.state.stream) {
      this.state.stream.destruct();
      this.setState({stream: undefined});
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
      onfinish: this.props.onEnd || noop
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

  render: function() {
    return <Display track={this.state.track} />
  }
});

/**
 * Expose SoundCloud component
 */

module.exports = SoundCloud;
