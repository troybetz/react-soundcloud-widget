/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var SoundCloud = require('../');

var url = 'https://soundcloud.com/hucci/hitta';
var url2 = 'https://soundcloud.com/robswire/knife-party-boss-mode-teaser';

var Example = React.createClass({
  getInitialState: function() {
    return {
      url: url
    };
  },

  _changeUrl: function() {
    var newUrl = this.state.url === url ? url2 : url;
    this.setState({url: newUrl});
  },

  render: function() {
    return (
      <div>
        <button onClick={this._changeUrl}>Change URL</button>
        <SoundCloud url={this.state.url} />
      </div>
    );
  }
});

/**
 * Render Example
 */

React.render(<Example />, document.body);
