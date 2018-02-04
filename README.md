loopback-disable-all-remote-methods-mixin
===============

[![npm version](https://badge.fury.io/js/loopback-disable-all-remote-methods-mixin.svg)](https://badge.fury.io/js/loopback-disable-all-remote-methods-mixin) [![Build Status](https://travis-ci.org/arondn2/loopback-disable-all-remote-methods-mixin.svg?branch=master)](https://travis-ci.org/arondn2/loopback-disable-all-remote-methods-mixin)
[![Coverage Status](https://coveralls.io/repos/github/arondn2/loopback-disable-all-remote-methods-mixin/badge.svg?branch=master)](https://coveralls.io/github/arondn2/loopback-disable-all-remote-methods-mixin?branch=master)

Loopback mixin to disable remote methods not included in acls.

## Installation

`npm install loopback-disable-all-remote-methods-mixin --save`

## Usage

Add the mixins property to your `server/model-config.json`:

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "../node_modules/loopback-disable-all-remote-methods-mixin",
      "../common/mixins"
    ]
  }
}
```

Add mixin params in in model definition. Example:
```
{
  "name": "Person",
  "properties": {
    "name": "string"
  },
  "properties": {
    "name": "string"
  },
  "mixins": {
    "DisableAllRemoteMethods": {
      "active": true,
      "debug": true
    }
  },
  "relations": {
    "mother": {
      "type": "belongsTo",
      "model": "Person"
    }
  },
  "acls": [
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY",
      "property": "*"
    },
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "find"
    },
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": [
        "prototype.patchAttributes",
        "patchAttributes"
      ]
    }
  ]
}
```

In the above definitions, all remote methods (including relations methods) has been disabled, except the methods `find` and `prototype.patchAttributes`. If you open `loopback-component-external` you will notice that just this methods are visible.

### Troubles

If you have any kind of trouble with it, just let me now by raising an issue on the GitHub issue tracker here:

https://github.com/arondn2/loopback-disable-all-remote-methods-mixin/issues

Also, you can report the orthographic errors in the READMEs files or comments. Sorry for that, English is not my main language.

## Tests

`npm test` or `npm run cover`

## Thanks

This mixin is an adaptation based on the code mentioned by [@ericaprieto](https://github.com/ericaprieto) in https://github.com/strongloop/loopback/issues/651.

Also the app-sample for tests is based in app used for tests of [@clarkbw](https://github.com/clarkbw) in https://github.com/clarkbw/loopback-ds-timestamp-mixin/tree/master/test/fixtures/simple-app
