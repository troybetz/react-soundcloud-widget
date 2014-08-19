/**
 * Module dependencies
 */

var React = require('react');
var PlayButton = require('./PlayButton.jsx');
var ProgressBar = require('./ProgressBar.jsx');

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
        <PlayButton stream={this.props.stream}/>
        <ProgressBar track={this.props.track} stream={this.props.stream}/>
      </div>
    );
  }
});