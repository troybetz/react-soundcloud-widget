# react-soundcloud-widget

Simple [React](http://facebook.github.io/react) component acting as a thin
layer over the [SoundCloud HTML5 Widget](https://developers.soundcloud.com/docs/api/html5-widget). 

## Features
- url playback
- customizable widget options
- playback event bindings
- lazy API loading


## Installation

```
$ npm install react-soundcloud-widget
```


## Usage

```xml
<SoundCloud url={string}
            id={string} // defaults to 'react-sc-widget'
            opts={object}
            onPlay={function}
            onPause={function}
            onEnd={function} />
```

### Widget options
Boolean toggles passed via `props.opts`

| Parameter | Purpose | Default|
| --------|-------------|
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


## Caveat

 Programmatic control of the widget as outlined in the [API docs](https://developers.soundcloud.com/docs/api/html5-widget) isn't included. Luckily, the API loads alongside the widget, so taking control is as easy as:
 
 ```
	var widget = SC.Widget('react-sc-player');
	// do stuff
 ```
 
The component itself uses `SC.Widget.load`, `SC.Widget.bind` and `SC.Widget.unbind`internally. Using those methods outside the component may cause problems. 

# License

  MIT