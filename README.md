# react-soundcloud-widget

Simple [React](http://facebook.github.io/react) component acting as a thin
layer over the [SoundCloud HTML5 Widget](https://developers.soundcloud.com/docs/api/html5-widget).

## Features

- url playback
- customizable widget options
- playback event bindings
- lazy API loading

## Installation

```shell
$ npm install react-soundcloud-widget
```

## Usage

```js
<SoundCloud
  url={string}         // required
  id={string}          // defaults -> 'react-sc-widget'
  opts={object}        // defaults -> './lib/default-options'
  onPlay={func}        // defaults -> noop
  onPause={func}       // defaults -> noop
  onEnd={func}         // defaults -> noop
/>
```

## Example

```js
var React = require('react');
var SoundCloud = require('react-soundcloud-widget');

var Example = React.createClass({
  _onPlay: function() {
    console.log('PLAYING');
  },

  render: function() {
    return (
      <SoundCloud url={'https://soundcloud.com/sylvanesso/coffee'}
                  onPlay={this._onPlay} />
    );
  }
});

```

### Widget options

Boolean toggles passed via `props.opts`

| Parameter | Purpose | Default|
| --------|-------------|------|
| `auto_play` | Start playing the widget after it’s loaded | `true` |
| `visual` | Display widget in [visual mode](https://soundcheck.soundcloud.com/music/our-new-visual-player/). | `false` |
| `buying` | Show/hide buy buttons | `true` |
| `liking` | Show/hide like buttons | `true` |
| `download` | Show/hide download buttons | `true` |
| `sharing` | Show/hide share buttons/dialogues | `true` |
| `show_artwork` | Show/hide artwork | `true` |
| `show_comments` | Show/hide comments | `true` |
| `show_playcount` | Show/hide number of sound plays | `true` |
| `show_user` | Show/hide the uploader name | `true` |
| `show_reposts` | Show/hide reposts | `false` |
| `hide_related` | Show/hide related tracks | `false` |

## Warning

Changing `props.url` currently adds an entry to `window.history`, breaking the back button (or at least adding another click to it).

You can see this in action at http://troybetz.com/react-soundcloud-widget/, change the url using the button and try navigating back.

This is outside my control for now, the widget used internally is served up and managed by SoundCloud. Super bummer.

## Caveat

Programmatic control of the widget as outlined in the [API docs](https://developers.soundcloud.com/docs/api/html5-widget) isn't included. Luckily, the API loads alongside the widget, so taking control is as easy as:

```js
var widget = SC.Widget('react-sc-player');
// do stuff
```

The component itself uses `SC.Widget.load`, `SC.Widget.bind` and `SC.Widget.unbind` internally. Using those methods outside the component may cause problems.

# License

  MIT
