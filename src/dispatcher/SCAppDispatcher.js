/**
 * Module dependencies
 */

var Dispatcher = require('react-dispatcher');
var SCConstants = require('../constants/SCConstants');
var copyProperties = require('react/lib/copyProperties');

var PayloadSources = SCConstants.PayloadSources;

/**
 * SC Application dispatcher
 */

module.exports = copyProperties(new Dispatcher(), {
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleExternalAction: function(action) {
    var payload = {
      source: PayloadSources.EXTERNAL_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});