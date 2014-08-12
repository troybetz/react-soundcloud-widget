/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var PlayButton = require('./PlayButton');
var ProgressBar = require('./ProgressBar');

/**
 * Display component
 *
 * Contains everything visible to user
 */

var Display = React.createClass({

  /**
   * Defaults to track artwork, but will use user avatar if none is available
   */

  _createBackground: function() {
    if (!this.props.track) return;
    var url = this.props.track.artwork_url || this.props.track.user.avatar_url;
    return 'url(' + this._enlarge(url) + ')';
  },

  /**
   * Retrieve larger version of image
   *
   * @param {string} url
   */

  _enlarge: function(url) {
    return url.replace(/large.jpg/, 't500x500.jpg');
  },

  render: function() {
    var displayStyles = {
      backgroundImage: this._createBackground(),
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      width: '100%',
      height: '100%'
    };

    return (
      <div className='sc-player' style={displayStyles}>
        <PlayButton togglePlayback={this.props.togglePlayback}
                    streamInfo={this.props.streamInfo}/>
                    
        <ProgressBar streamInfo={this.props.streamInfo}
                     setPosition={this.props.setPosition}/>
      </div>
    );
  }
});

/**
 * Expose Display component
 */

module.exports = Display;
