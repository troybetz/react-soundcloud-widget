/**
 * Module dependencies
 */

import React from 'react';
import createWidget from './lib/createWidget';

let internalWidget;

/**
 * Do nothing.
 */

const noop = () => {};

/**
 * Create a new `SoundCloud` component.
 *
 * This is essentially a glorified wrapper over the existing
 * HTML5 widget from SoundCloud. Programmatic control not included.
 */

const SoundCloud = React.createClass({
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

  getDefaultProps() {
    return {
      id: 'react-sc-widget',
      opts: {},
      onPlay: noop,
      onPause: noop,
      onEnd: noop
    };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.url !== this.props.url;
  },

  componentDidMount() {
    createWidget(this.props.id, (widget) => {
      this._setupWidget(widget);
      this._reloadWidget();
    });
  },

  componentDidUpdate() {
    this._reloadWidget();
  },

  componentWillUnmount() {
    this._unbindEvents();
  },

  render() {
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

  _setupWidget(widget) {
    internalWidget = widget;
    this._bindEvents();
  },

  /**
   * Reload the embedded iframe with a new widget.
   */

  _reloadWidget() {
    internalWidget.load(this.props.url, this.props.opts);
  },

  /**
   * Listen for events coming from `widget`, and pass them up the
   * chain to the parent component if needed.
   */

  _bindEvents() {
    internalWidget.bind(window.SC.Widget.Events.PLAY, this.props.onPlay);
    internalWidget.bind(window.SC.Widget.Events.PAUSE, this.props.onPause);
    internalWidget.bind(window.SC.Widget.Events.FINISH, this.props.onEnd);
  },

  /**
   * Remove all event bindings.
   */

  _unbindEvents() {
    internalWidget.unbind(window.SC.Widget.Events.PLAY);
    internalWidget.unbind(window.SC.Widget.Events.PAUSE);
    internalWidget.unbind(window.SC.Widget.Events.FINISH);
  }
});

/**
 * Expose `SoundCloud` component
 */

export default SoundCloud;
