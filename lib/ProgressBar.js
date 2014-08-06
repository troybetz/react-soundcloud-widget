/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');

/**
 * Progress Bar component
 */

var ProgressBar = React.createClass({
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
    var containerWidth = this.refs.container.getDOMNode().clientWidth;
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
   * @param {number} newPosition
   * @param {number} [containerWidth] - only passed through onMouseDown handler
   */
  
  _setNewPosition: function(newPosition, containerWidth) {
    if (containerWidth && containerWidth !== this.state.containerWidth) {
      this.setState({containerWidth: containerWidth});
    } else {
      containerWidth = this.state.containerWidth;
    }
    this.props.setPosition((newPosition / containerWidth) * this.props.duration);
  },

  /**
   * Return the current width of the progress bar.
   */
  
  _getProgressBarWidth: function() {
    return (this.props.position / this.props.duration) * 100;
  },

  render: function() {
    var containerStyles = {
      height: '50px',
      width: '100%',
      background: 'grey'
    };

    var progressBarStyles = {
      height: '100%',
      width: this._getProgressBarWidth() + '%',
      background: '#ff7700'
    };

    return (
      <div className='progress-bar-container'
           style={containerStyles}
           ref='container'
           onMouseDown={this._onMouseDown}
           onMouseMove={this._onMouseMove}
           onMouseUp={this._exitDrag}
           onMouseLeave={this._exitDrag}>
        <div className='progress-bar' style={progressBarStyles}></div>
      </div>
    );
  }
});

/**
 * Expose Progress Bar component
 */

module.exports = ProgressBar;