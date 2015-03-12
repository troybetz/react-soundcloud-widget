/**
 * Module dependencies
 */

var load = require('load-script');

/**
 * Expose `createWidget`
 */

module.exports = createWidget;

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
