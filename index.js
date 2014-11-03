/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var merge = require('react/lib/merge');
var DEFAULT_OPTIONS = require('./lib/default-options');

function noop() {};

/**
 * Create new `SoundCloud` component
 */

var SoundCloud = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    opts: React.PropTypes.objectOf(React.PropTypes.bool)
  },

  getDefaultProps: function() {
    return {
      onPlay: noop,
      onPause: noop,
      onEnd: noop,
      opts: DEFAULT_OPTIONS
    };
  },

  getInitialState: function() {
    return {
      widget: undefined
    };
  },

  componentDidMount: function() {
    var widget = SC.Widget('react-sc-player');
    var embedOpts = merge(DEFAULT_OPTIONS, this.props.opts);
    widget.load(this.props.url, embedOpts);

    this.setState({widget: widget});
    this._bindEvents();
  },

  componentWillUpdate: function(nextProps) {
    if (nextProps.url !== this.props.url) {
      var embedOpts = merge(DEFAULT_OPTIONS, this.props.opts);
      this.state.widget.load(nextProps.url, embedOpts);
    }
  },

  componentWillUnmount: function() {
    this._unbindEvents();
  },

  render: function() {
    return (
      <iframe id='react-sc-player'
              width='100%' 
              height='450' 
              scrolling='no' 
              frameBorder='no' 
              src='https://w.soundcloud.com/player/?url='
      />
    );
  },

  /**
   * Listen for events coming from `widget`, and pass them up the
   * chain to the parent component if needed.
   */

  _bindEvents: function() {
    this.state.widget.bind(SC.Widget.Events.PLAY, this.props.onPlay);
    this.state.widget.bind(SC.Widget.Events.PAUSE, this.props.onPause);
    this.state.widget.bind(SC.Widget.Events.FINISH, this.props.onEnd);
  },

  _unbindEvents: function() {
    this.state.widget.unbind(SC.Widget.Events.PLAY);
    this.state.widget.unbind(SC.Widget.Events.PAUSE);
    this.state.widget.unbind(SC.Widget.Events.FINISH);
  }
});

/**
 * Expose `SoundCloud` component
 */

module.exports = SoundCloud;
