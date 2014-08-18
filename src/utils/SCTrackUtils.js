/**
 * SCTrackUtils
 *
 */

module.exports = {

  /**
   * Prepare track for presentation
   *
   * @param {Object} track
   */

  format: function(track) {
    var correctArtworkUrl = extractCorrectArtwork(track);
    track.formattedArtworkUrl = enlarge(correctArtworkUrl);
    return track;
  }
};

/**
 * Default to track artwork, but if none is available use the
 * user's avatar instead
 *
 * TODO: Add a default placeholder image if neither is available.
 *
 * @param {Object} track
 * @return {Object}
 */

function extractCorrectArtwork(track) {
  return track.artwork_url || track.user.avatar_url;
}

/**
 * Request a larger version of whatever artwork URL we are using.
 *
 * @param {String} artworkUrl
 * @return {String}
 */

function enlarge(artworkUrl) {
  return artworkUrl.replace(/large.jpg/, 't500x500.jpg');
}
