/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var TrackStore = require('../stores/TrackStore');
var SCClientActionCreators = require('../actions/SCClientActionCreators');
var SCTrackActionCreators = require('../actions/SCTrackActionCreators');

function getStateFromStores() {
  return {
    track: TrackStore.get()
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
    SCClientActionCreators.register(this.props.clientId);
    SCTrackActionCreators.load(this.props.track);
    TrackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TrackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return <h1>{this.state.track.title}</h1>
  }
});