"use strict";

/**
 * Module dependencies
 */

var React = require("react");
var createWidget = require("./lib/createWidget");

var internalWidget;

/**
 * Create a new `SoundCloud` component.
 *
 * This is essentially a glorified wrapper over the existing
 * HTML5 widget from SoundCloud. Programmatic control not included.
 */

var SoundCloud = React.createClass({
  displayName: "SoundCloud",

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

  getDefaultProps: function getDefaultProps() {
    return {
      id: "react-sc-widget",
      opts: {},
      onPlay: noop,
      onPause: noop,
      onEnd: noop
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    return nextProps.url !== this.props.url;
  },

  componentDidMount: function componentDidMount() {
    createWidget(this.props.id, (function (widget) {
      this._setupWidget(widget);
      this._reloadWidget();
    }).bind(this));
  },

  componentDidUpdate: function componentDidUpdate() {
    this._reloadWidget();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindEvents();
  },

  render: function render() {
    return React.createElement("iframe", {
      id: this.props.id,
      width: "100%",
      height: this.props.opts.visual ? "450" : "166",
      scrolling: "no",
      frameBorder: "no",
      src: "https://w.soundcloud.com/player/?url="
    });
  },

  /**
   * Integrate a newly created `widget` with the rest of the component.
   *
   * @param {Object} Widget
   */

  _setupWidget: function _setupWidget(widget) {
    internalWidget = widget;
    this._bindEvents();
  },

  /**
   * Reload the embedded iframe with a new widget.
   */

  _reloadWidget: function _reloadWidget() {
    internalWidget.load(this.props.url, this.props.opts);
  },

  /**
   * Listen for events coming from `widget`, and pass them up the
   * chain to the parent component if needed.
   */

  _bindEvents: function _bindEvents() {
    internalWidget.bind(window.SC.Widget.Events.PLAY, this.props.onPlay);
    internalWidget.bind(window.SC.Widget.Events.PAUSE, this.props.onPause);
    internalWidget.bind(window.SC.Widget.Events.FINISH, this.props.onEnd);
  },

  /**
   * Remove all event bindings.
   */

  _unbindEvents: function _unbindEvents() {
    internalWidget.unbind(window.SC.Widget.Events.PLAY);
    internalWidget.unbind(window.SC.Widget.Events.PAUSE);
    internalWidget.unbind(window.SC.Widget.Events.FINISH);
  }
});

/**
 * Do nothing
 */

function noop() {}

/**
 * Expose `SoundCloud` component
 */

module.exports = SoundCloud;