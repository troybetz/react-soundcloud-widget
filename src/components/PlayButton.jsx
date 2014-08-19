/**
 * Module dependencies
 */

var React = require('react');
var SCStreamActionCreators = require('../actions/SCStreamActionCreators');

/**
 * Play Button component
 */

module.exports = React.createClass({
  _handleClick: function() {
    SCStreamActionCreators.togglePause();
  },

  render: function() {
    return <button onClick={this._handleClick}>Play</button>;
  }
});