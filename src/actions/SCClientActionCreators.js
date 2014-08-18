/**
 * Module dependencies
 */

var SCWebAPIUtils = require('../utils/SCWebAPIUtils');

/**
 * Actions called on initialization of component
 */

module.exports = {

  /**
   * Register new SoundCloud API client
   *
   * @param {String} clientId
   */
  
  register: function(clientId) {
    SCWebAPIUtils.register(clientId);
  }
};