/** @jsx React.DOM */

/**
 * Module dependencies
 */

var React = require('react');
var SoundCloud = require('../');

var url = 'https://soundcloud.com/hucci/wings';
var url2 = 'https://soundcloud.com/robswire/knife-party-boss-mode-teaser';
var url3 = {
  "kind": "track",
  "id": 65540182,
  "created_at": "2012/10/31 18:19:12 +0000",
  "user_id": 1143882,
  "duration": 259367,
  "commentable": true,
  "state": "finished",
  "original_content_size": 10405244,
  "sharing": "public",
  "tag_list": "hucci stookisound brighton london alltrapmusic thisistrapmusic baauer flosstradamus",
  "permalink": "hucci-stooki-sound-ball-so-hard",
  "streamable": true,
  "embeddable_by": "all",
  "downloadable": false,
  "purchase_url": null,
  "label_id": null,
  "purchase_title": null,
  "genre": "TRAP",
  "title": "Hucci x Stooki Sound - Ball So Hard",
  "description": "Teamed up with @StookiSound and we cooked this\r\n\r\n@AllTrapMusic http://www.youtube.com/watch?v=SUu0KIvTe44\r\n\r\nhttp://www.facebook.com/huccii\r\n\r\nhttp://www.facebook.com/stookisound",
  "label_name": "",
  "release": "",
  "track_type": "",
  "key_signature": "",
  "isrc": "",
  "video_url": null,
  "bpm": null,
  "release_year": null,
  "release_month": null,
  "release_day": null,
  "original_format": "mp3",
  "license": "all-rights-reserved",
  "uri": "https://api.soundcloud.com/tracks/65540182",
  "user": {
    "id": 1143882,
    "kind": "user",
    "permalink": "hucci",
    "username": "HU₵₵I",
    "uri": "https://api.soundcloud.com/users/1143882",
    "permalink_url": "http://soundcloud.com/hucci",
    "avatar_url": "https://i1.sndcdn.com/avatars-000096090932-mcbrxg-large.jpg?e76cf77"
  },
  "permalink_url": "http://soundcloud.com/hucci/hucci-stooki-sound-ball-so-hard",
  "artwork_url": "https://i1.sndcdn.com/artworks-000033246614-2h0xvi-large.jpg?e76cf77",
  "waveform_url": "https://w1.sndcdn.com/8e8rz5rHhxFq_m.png",
  "stream_url": "https://api.soundcloud.com/tracks/65540182/stream",
  "playback_count": 1759136,
  "download_count": 0,
  "favoritings_count": 31516,
  "comment_count": 1369,
  "attachments_uri": "https://api.soundcloud.com/tracks/65540182/attachments",
  "policy": "ALLOW"
};

var Example = React.createClass({
  getInitialState: function() {
    return {
      url: url
    };
  },

  _changeToUrl1: function() {
    this.setState({url: url});
  },

  _changeToUrl2: function() {
    this.setState({url: url2});
  },

  _changeToUrl3: function() {
    this.setState({url: url3});
  },

  onPlay: function() {
    console.log('playing');
  },

  render: function() {
    return (
      <div>
        <button onClick={this._changeToUrl1}>Track 1</button>
        <button onClick={this._changeToUrl2}>Track 2</button>
        <button onClick={this._changeToUrl3}>Track 3</button>
        <SoundCloud track={this.state.url} clientId='c78f859521b6ca735e4ae291833796b8' onPlay={this.onPlay}/>
      </div>
    );
  }
});

/**
 * Render Example
 */

React.renderComponent(<Example />, document.body);