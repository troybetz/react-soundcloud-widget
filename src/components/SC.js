/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var SCClientActionCreators = require('../actions/SCClientActionCreators');

/**
 * SoundCloud Component
 */

module.exports = React.createClass({
  
  componentDidMount: function() {
    SCClientActionCreators.register(this.props.clientId);
  },

  render: function() {
    return <h1>SoundCloud</h1>
  }
});