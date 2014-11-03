/**
 * Default options for an embedded widget.
 *
 * https://developers.soundcloud.com/docs/api/html5-widget#params
 *
 * Options marked with `*` are additional options I've come across when
 * embedding visual players. I'm not 'technically' sure what they do, but
 * they do something. 
 */

module.exports = {
  auto_play: false,     // Whether to start playing the widget after it’s loaded
  visual: false,        // Display as visual player. 
  buying: true,         // Show/hide buy buttons
  liking: true,         // Show/hide like buttons
  download: true,       // Show/hide download buttons
  sharing: true,        // Show/hide share buttons/dialogues
  show_artwork: true,   // Show/hide artwork
  show_comments: true,  // Show/hide comments
  show_playcount: true, // Show/hide number of sound plays
  show_user: true,      // Show/hide the uploader name
  show_reposts: false,  // * Show/hide reposts
  hide_related: false   // * Show/hide related tracks
};
