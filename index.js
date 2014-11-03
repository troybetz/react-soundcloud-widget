/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var merge = require('react/lib/merge');
var DEFAULT_OPTIONS = require('./lib/default-options');

/**
 * Create new `SoundCloud` component
 */

var SoundCloud = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    opts: React.PropTypes.objectOf(React.PropTypes.bool),
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onEnd: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      id: 'react-sc-player',
      opts: DEFAULT_OPTIONS,
      onPlay: noop,
      onPause: noop,
      onEnd: noop
    };
  },

  getInitialState: function() {
    return {
      widget: null
    };
  },

  componentDidMount: function() {
    var widget = SC.Widget(this.props.id);
    
    widget.load(this.props.url, genEmbedOpts(this.props.opts));

    this.setState({widget: widget});
    this._bindEvents();
  },

  componentWillUpdate: function(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.state.widget.load(nextProps.url, genEmbedOpts(nextProps.opts));
    }
  },

  componentWillUnmount: function() {
    this._unbindEvents();
  },

  render: function() {
    return (
      <iframe id={this.props.id}
              width='100%' 
              height={this.props.opts.visual ? '450' : '166'} 
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

  /**
   * Remove all event bindings.
   */

  _unbindEvents: function() {
    this.state.widget.unbind(SC.Widget.Events.PLAY);
    this.state.widget.unbind(SC.Widget.Events.PAUSE);
    this.state.widget.unbind(SC.Widget.Events.FINISH);
  }
});

/**
 * Combine `opts` with SoundCloud`s default widget options
 *
 * @param {Object} opts
 * @returns {Object}
 */

function genEmbedOpts(opts) {
  return merge(DEFAULT_OPTIONS, opts);
}

/**
 * Do nothing
 */

function noop() {};

/**
 * Expose `SoundCloud` component
 */

module.exports = SoundCloud;
