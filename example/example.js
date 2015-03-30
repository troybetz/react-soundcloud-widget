/**
 * Module dependencies
 */

import React from 'react';
import SoundCloud from '../';
import './normalize.css';
import './example.css';

const urlA = 'https://soundcloud.com/sylvanesso/coffee';
const urlB = 'https://soundcloud.com/hudsonmohawke/chimes';

/**
 * Example component that toggles between two urls while responding
 * to playback events from the widget.
 */

class Example extends React.Component {
  constructor() {
    this.state = {
      url: urlA
    };

    this._changeUrl = this._changeUrl.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnd = this._onEnd.bind(this);
  }

  render() {
    const playerOptions = {
      visual: true,
      sharing: false,
      hide_related: true
    };

    return (
      <div className='example'>
        <SoundCloud
          url={this.state.url}
          id={'gh-pages-soundcloud'}
          opts={playerOptions}
          onPlay={this._onPlay}
          onPause={this._onPause}
          onEnd={this._onEnd}>
        </SoundCloud>

        <div className='changeUrl'>
          <button onClick={this._changeUrl}>Change url</button>
        </div>
      </div>
    );
  }

  /**
   * Toggle between urlA & urlB
   */

  _changeUrl() {
    this.setState({
      url: this.state.url === urlA ? urlB : urlA
    });
  }

  _onPlay() {
    console.log('PLAYING');
  }

  _onPause() {
    console.log('PAUSED');
  }

  _onEnd() {
    console.log('ENDED');
  }
}

/**
 * Render the example
 */

React.render(<Example />, document.getElementsByClassName('content')[0]);
