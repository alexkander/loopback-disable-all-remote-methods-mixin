'use strict';

const DisableAllRemoteMethods = require('./disable-all-remote-methods');

module.exports = unction (app) {
  app.loopback.modelBuilder.mixins.define('DisableAllRemoteMethods', DisableAllRemoteMethods);
};
