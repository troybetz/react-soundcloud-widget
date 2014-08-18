/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var PlayButton = require('./PlayButton');

/**
 * Display component
 */

module.exports = React.createClass({
  render: function() {
    var styles = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + this.props.track.formattedArtworkUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    };

    return (
      <div style={styles}>
        <PlayButton />
        <h1>{this.props.track.title}</h1>
        <h3>{this.props.stream.url}</h3>
      </div>
    );
  }
});