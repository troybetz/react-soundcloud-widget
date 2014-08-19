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
    var msg = this.props.stream.isPlaying ? 'stop' : 'play';
    return <button onClick={this._handleClick}>{msg}</button>;
  }
});