/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var SoundCloud = require('../');

var url = 'https://soundcloud.com/hucci/hucci-stooki-sound-ball-so-hard';
var url2 = 'https://soundcloud.com/robswire/knife-party-boss-mode-teaser';

var Example = React.createClass({
  getInitialState: function() {
    return {
      url: url
    };
  },

  _changeToUrl1: function() {
    this.setState({url: url});
  },

  _changeToUrl2: function() {
    this.setState({url: url2});
  },

  onPlay: function() {
    console.log('playing');
  },

  render: function() {
    return (
      <div>
        <button onClick={this._changeToUrl1}>Track 1</button>
        <button onClick={this._changeToUrl2}>Track 2</button>
        <SoundCloud url={this.state.url} clientId='c78f859521b6ca735e4ae291833796b8' onPlay={this.onPlay}/>
      </div>
    );
  }
});

/**
 * Render Example
 */

React.renderComponent(<Example />, document.body);