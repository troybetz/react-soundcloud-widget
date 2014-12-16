/**
 * Module dependencies
 */

var React = require('react');
var SoundCloud = require('../');

var url = 'https://soundcloud.com/hucci/hitta';
var url2 = 'https://soundcloud.com/robswire/knife-party-boss-mode-teaser';

var Example = React.createClass({displayName: 'Example',
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
      React.createElement("div", null, 
        React.createElement("button", {onClick: this._changeUrl}, "Change URL"), 
        React.createElement(SoundCloud, {url: this.state.url})
      )
    );
  }
});

/**
 * Render Example
 */

React.render(React.createElement(Example, null), document.body);
