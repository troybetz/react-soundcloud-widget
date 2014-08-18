/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var TrackStore = require('../stores/TrackStore');
var StreamStore = require('../stores/StreamStore');
var SCClientActionCreators = require('../actions/SCClientActionCreators');
var SCTrackActionCreators = require('../actions/SCTrackActionCreators');

function getStateFromStores() {
  return {
    track: TrackStore.get(),
    stream: StreamStore.get()
  };
}

/**
 * SoundCloud Component
 */

module.exports = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },
  
  componentDidMount: function() {
    TrackStore.addChangeListener(this._onChange);
    StreamStore.addChangeListener(this._onChange);
    
    SCClientActionCreators.register(this.props.clientId);
    SCTrackActionCreators.load(this.props.track);
  },

  componentWillUnmount: function() {
    TrackStore.removeChangeListener(this._onChange);
    StreamStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function(newProps) {
    SCTrackActionCreators.checkTrack(newProps.track);
  },  

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    var styles = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + this.state.track.formattedArtworkUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%'
    };

    return (
      <div style={styles}>
        <h1>{this.state.track.title}</h1>
        <h3>{this.state.stream.url}</h3>
      </div>
    );
  }
});