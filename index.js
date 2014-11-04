/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var load = require('load-script');
var merge = require('react/lib/merge');
var DEFAULT_OPTIONS = require('./lib/default-options');

/**
 * Create a new `SoundCloud` component.
 *
 * This is essentially a glorified wrapper over the existing
 * HTML5 widget from SoundCloud. Programmatic control not included.
 */

var SoundCloud = React.createClass({
  propTypes: {

    // url to play. It's kept in sync, changing it will
    // cause the widget to refresh and play the new url.
    url: React.PropTypes.string.isRequired,

    // custom ID for widget iframe element
    id: React.PropTypes.string,

    // widget parameters for appearance and auto play.
    opts: React.PropTypes.objectOf(React.PropTypes.bool),

    // event subscriptions
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onEnd: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      id: 'react-sc-widget',
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
    var _this = this;

    createWidget(this.props.id, function(widget) {
      _this._setupWidget(widget);
      _this._loadUrl(_this.props.url, _this.props.opts);
    });
  },

  /**
   * If the `url` has changed, load it.
   *
   * @param {Object} nextProps
   */
  
  componentWillUpdate: function(nextProps) {
    if (nextProps.url !== this.props.url) {
      this._loadUrl(nextProps.url, nextProps.opts);
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
   * Integrate a newly created `widget` with the rest of the component.
   *
   * @param {Object} Widget
   */

  _setupWidget: function(widget) {
    this.setState({widget: widget});
    this._bindEvents();
  },

  /**
   * Load a `url` into the widget. This also causes the widget to refresh,
   * making it the only chance to change its appearance via `opts`.
   *
   * @param {String} url
   * @param {Object} opts
   */

  _loadUrl: function(url, opts) {
    opts = merge(DEFAULT_OPTIONS, opts);
    this.state.widget.load(url, opts);
  },

  /**
   * Listen for events coming from `widget`, and pass them up the
   * chain to the parent component if needed.
   */

  _bindEvents: function() {
    this.state.widget.bind(window.SC.Widget.Events.PLAY, this.props.onPlay);
    this.state.widget.bind(window.SC.Widget.Events.PAUSE, this.props.onPause);
    this.state.widget.bind(window.SC.Widget.Events.FINISH, this.props.onEnd);
  },

  /**
   * Remove all event bindings.
   */

  _unbindEvents: function() {
    this.state.widget.unbind(window.SC.Widget.Events.PLAY);
    this.state.widget.unbind(window.SC.Widget.Events.PAUSE);
    this.state.widget.unbind(window.SC.Widget.Events.FINISH);
  }
});

/**
 * Create a new `widget` by requesting and using the SoundCloud Widget API.
 *
 * @param {String} id - reference to iframe element for widget
 * @param {Function} cb
 */

function createWidget(id, cb) {
    // load the API, it's namespaced as `window.SC`
  return load('https://w.soundcloud.com/player/api.js', function(err) {
    var widget = window.SC.Widget(id);
    return cb(widget);
  });
}

/**
 * Do nothing
 */

function noop() {}

/**
 * Expose `SoundCloud` component
 */

module.exports = SoundCloud;
