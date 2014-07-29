/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Play button component
 */

var PlayButton = React.createClass({
  render: function() {
    var msg = this.props.isPlaying ? 'stop' : 'play';
    return <button onClick={this.props.togglePlayback}>{msg}</button>
  },
});

/**
 * Expose PlayButton component
 */

module.exports = PlayButton;
