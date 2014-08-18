/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var TrackStore = require('../stores/TrackStore');
var SCClientActionCreators = require('../actions/SCClientActionCreators');
var SCTrackActionCreators = require('../actions/SCTrackActionCreators');

/**
 * SoundCloud Component
 */

module.exports = React.createClass({
  
  componentDidMount: function() {
    SCClientActionCreators.register(this.props.clientId);
    SCTrackActionCreators.load(this.props.track);
  },

  render: function() {
    return <h1>SoundCloud</h1>
  }
});