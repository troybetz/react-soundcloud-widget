/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Create new `SoundCloud` component
 */

var SoundCloud = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      widget: undefined
    };
  },

  componentDidMount: function() {
    var widget = SC.Widget('react-sc-player');
    widget.load(this.props.url);
    this.setState({widget: widget});
  },

  componentWillUpdate: function(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.state.widget.load(nextProps.url);
    }
  },

  render: function() {
    return (
      <iframe id='react-sc-player'
              width='100%' 
              height='450' 
              scrolling='no' 
              frameBorder='no' 
              src='https://w.soundcloud.com/player/?url='
      />
    );
  }
});

/**
 * Expose `SoundCloud` component
 */

module.exports = SoundCloud;
