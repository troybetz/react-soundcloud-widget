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
    var styles = {
      position: 'absolute',
      zIndex: '100'
    };

    var msg = this.props.streamInfo.isPlaying ? 'stop' : 'play';
    return <button style={styles}>{msg}</button>
  },
});

/**
 * Expose PlayButton component
 */

module.exports = PlayButton;
