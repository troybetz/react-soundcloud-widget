"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * Module dependencies
 */

var load = _interopRequire(require("load-script"));

/**
 * Create a new `widget` by requesting and using the SoundCloud Widget API.
 *
 * @param {String} id - reference to iframe element for widget
 * @param {Function} cb
 */

var createWidget = function (id, cb) {
  return load("https://w.soundcloud.com/player/api.js", function (err) {
    return cb(window.SC.Widget(id));
  });
};

/**
 * Expose `createWidget`
 */

module.exports = createWidget;