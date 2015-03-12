/**
 * Module dependencies
 */

import React from 'react';
import SoundCloud from '../';
import './example.css';

const url = 'https://soundcloud.com/sylvanesso/coffee';
const url2 = 'https://soundcloud.com/hudsonmohawke/chimes';

class Example extends React.Component {
  constructor() {
    this.state = {
      url: url
    };

    this._changeUrl = this._changeUrl.bind(this);
  }

  render() {
    const opts = {
      visual: true,
      buying: false,
      liking: false,
      sharing: false
    };

    return (
      <div className='example'>
        <SoundCloud url={this.state.url}
                    opts={opts}
                    onPlay={this._onPlay}
                    onPause={this._onPause}
                    onEnd={this._onEnd}
        />

        <div className='changeUrl'>
          <button onClick={this._changeUrl}>Change url</button>
        </div>
      </div>
    );
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

  _changeUrl() {
    const newUrl = this.state.url === url ? url2 : url;
    this.setState({url: newUrl});
  }
}

/**
 * Render Example
 */

React.render(<Example />, document.querySelector('section.content'));
