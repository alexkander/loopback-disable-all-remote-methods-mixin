'use strict';

const DisableAllRemoteMethods = require('./disable-all-remote-methods');

module.exports = function (app) {
  app.loopback.modelBuilder.mixins.define('DisableAllRemoteMethods', DisableAllRemoteMethods);
};
