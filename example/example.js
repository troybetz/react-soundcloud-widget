/**
 * Module dependencies
 */

var React = require('react');
var SoundCloud = require('../');

// styles
require('./example.css');

var url = 'https://soundcloud.com/sylvanesso/coffee';
var url2 = 'https://soundcloud.com/hudsonmohawke/chimes';

var Example = React.createClass({displayName: 'Example',
  getInitialState: function() {
    return {
      url: url
    };
  },

  _onPlay: function() {
    console.log('PLAYING');
  },

  _onPause: function() {
    console.log('PAUSED');
  },

  _onEnd: function() {
    console.log('ENDED');
  },

  _changeUrl: function() {
    var newUrl = this.state.url === url ? url2 : url;
    this.setState({url: newUrl});
  },

  render: function() {
    return (
      React.createElement('div', {className: 'example'},
        React.createElement(SoundCloud, {
          url: this.state.url,
          opts: {
            visual: true,
            buying: false,
            liking: false,
            sharing: false
          },
          onPlay: this._onPlay,
          onPause: this._onPause,
          onEnd: this._onEnd,
        }),

        React.createElement('div', {className: 'changeUrl'},
          React.createElement('button', {onClick: this._changeUrl}, 'Change url')
        )
      )
    );
  }
});

/**
 * Render Example
 */

React.render(React.createElement(Example, null), document.querySelector('section.content'));
