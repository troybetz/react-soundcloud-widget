/**
 * Module dependencies
 */

var React = require('react');
var TrackStore = require('../stores/TrackStore');
var StreamStore = require('../stores/StreamStore');
var SCClientActionCreators = require('../actions/SCClientActionCreators');
var SCTrackActionCreators = require('../actions/SCTrackActionCreators');
var Display = require('./Display.jsx');

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
    return (
      <div>
        <Display track={this.state.track} stream={this.state.stream}/>
      </div>
    );
  }
});