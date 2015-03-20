"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Module dependencies
 */

var React = _interopRequire(require("react"));

var createWidget = _interopRequire(require("./lib/createWidget"));

/**
 * Create a new `SoundCloud` component.
 *
 * This is essentially a glorified wrapper over the existing
 * HTML5 widget from SoundCloud. Programmatic control not included.
 *
 * NOTE: Changing `props.url` will cause the component to load it.
 * Unfortunately, SoundCloud adds an entry to `window.history` every time
 * a new url is loaded, so changing `props.url` __will__ break the back button.
 */

var SoundCloud = (function (_React$Component) {

  /**
   * @param {Object} props
   */

  function SoundCloud(props) {
    _classCallCheck(this, SoundCloud);

    _get(Object.getPrototypeOf(SoundCloud.prototype), "constructor", this).call(this, props);
    this._internalWidget = null;
  }

  _inherits(SoundCloud, _React$Component);

  _createClass(SoundCloud, {
    shouldComponentUpdate: {

      /**
       * @param {Object} nextProps
       * @returns {Boolean}
       */

      value: function shouldComponentUpdate(nextProps) {
        return nextProps.url !== this.props.url;
      }
    },
    componentDidMount: {
      value: function componentDidMount() {
        this._createWidget();
      }
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        this._reloadWidget();
      }
    },
    componentWillUnmount: {
      value: function componentWillUnmount() {
        this._unbindEvents();
      }
    },
    render: {

      /**
       * @returns {Object}
       */

      value: function render() {
        return React.createElement("iframe", { id: this.props.id,
          width: "100%",
          height: this.props.opts.visual ? "450" : "166",
          scrolling: "no",
          frameBorder: "no",
          src: "https://w.soundcloud.com/player/?url="
        });
      }
    },
    _createWidget: {

      /**
       * Called on the initial render, this uses the rendered iframe
       * as a base for creating a new `_internalWidget`.
       */

      value: function _createWidget() {
        var _this = this;

        createWidget(this.props.id, function (widget) {
          _this._setupWidget(widget);
          _this._reloadWidget();
        });
      }
    },
    _setupWidget: {

      /**
       * Integrate a newly created `widget` with the rest of the component.
       *
       * @param {Object} Widget
       */

      value: function _setupWidget(widget) {
        this._internalWidget = widget;
        this._bindEvents();
      }
    },
    _reloadWidget: {

      /**
       * This is the only way to manipulate the embedded iframe, it's essentially
       * refreshed and reloaded.
       *
       * NOTE: SoundCloud adds an entry to `window.history` after reloading. This is
       * __really__ annoying, but unavoidable at the moment, so basically every
       * time the url changes it breaks the back button. Super bummer.
       */

      value: function _reloadWidget() {
        this._internalWidget.load(this.props.url, this.props.opts);
      }
    },
    _bindEvents: {

      /**
       * Listen for events coming from `widget`, and pass them up the
       * chain to the parent component if needed.
       */

      value: function _bindEvents() {
        this._internalWidget.bind(window.SC.Widget.Events.PLAY, this.props.onPlay);
        this._internalWidget.bind(window.SC.Widget.Events.PAUSE, this.props.onPause);
        this._internalWidget.bind(window.SC.Widget.Events.FINISH, this.props.onEnd);
      }
    },
    _unbindEvents: {

      /**
       * Remove all event bindings.
       */

      value: function _unbindEvents() {
        this._internalWidget.unbind(window.SC.Widget.Events.PLAY);
        this._internalWidget.unbind(window.SC.Widget.Events.PAUSE);
        this._internalWidget.unbind(window.SC.Widget.Events.FINISH);
      }
    }
  });

  return SoundCloud;
})(React.Component);

SoundCloud.propTypes = {
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
};

SoundCloud.defaultProps = {
  id: "react-sc-widget",
  opts: {},
  onPlay: function () {},
  onPause: function () {},
  onEnd: function () {}
};

/**
 * Expose `SoundCloud` component
 */

module.exports = SoundCloud;