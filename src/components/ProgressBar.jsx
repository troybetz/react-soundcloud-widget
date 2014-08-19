/**
 * Module dependencies
 */

var React = require('react');
var SCStreamActionCreators = require('../actions/SCStreamActionCreators');

/**
 * Progress Bar component
 */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      dragging: false,
      containerWidth: 0
    };
  },

  /**
   * Clicking on the progress bar skips to a certain part of the track.
   * Container width is recalculated each time, to adjust for resizing
   * of player.
   *
   * @param {object} event
   */

  _onMouseDown: function(event) {
    var mousePosition = event.nativeEvent.offsetX;
    var containerWidth = this.getDOMNode().clientWidth;
    this._setNewPosition(mousePosition, containerWidth);
    this.setState({dragging: true});
  },

  /**
   * Change position of track alongside cursor position only if the progress
   * bar is currently being dragged.
   *
   * @param {object} event
   */

  _onMouseMove: function(event) {
    if (!this.state.dragging) return;
    var mousePosition = event.nativeEvent.offsetX;
    this._setNewPosition(mousePosition);
  },

  /**
   * Cease tracking the cursor & updating track position.
   */
  
  _exitDrag: function() {
    this.setState({dragging: false});
  },

  /**
   * Skips to a certain part of a track using the cursor position and
   * progress bar container width as parameters. Will update state if the
   * container has been resized.
   *
   * @param {number} mousePosition
   * @param {number} [containerWidth] - only passed through onMouseDown handler
   */
  
  _setNewPosition: function(mousePosition, containerWidth) {
    if (containerWidth && containerWidth !== this.state.containerWidth) {
      this.setState({containerWidth: containerWidth});
    } else {
      containerWidth = this.state.containerWidth;
    }

    var newPosition = (mousePosition / containerWidth) * this.props.stream.duration;
    SCStreamActionCreators.skipTo(newPosition);
  },

  /**
   * Return the current width of the progress bar.
   */
  
  _getProgressBarWidth: function() {
    return (this.props.stream.position / this.props.stream.duration) * 100;
  },

  render: function() {
    var containerStyles = {
      height: '50px',
      width: '100%',
      background: 'grey',
      opacity: 1,
      transition: 'opacity ease-in-out 150ms'
    };

    var progressBarStyles = {
      height: '100%',
      width: this._getProgressBarWidth() + '%',
      background: '#ff7700'
    };

    return (
      <div style={containerStyles}
           onMouseDown={this._onMouseDown}
           onMouseMove={this._onMouseMove}
           onMouseUp={this._exitDrag}
           onMouseLeave={this._exitDrag}>
        <div style={progressBarStyles}></div>
      </div>
    );
  }
});