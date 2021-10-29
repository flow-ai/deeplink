"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = require("./helpers");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Encode given data into base64 string
 * @param {Object} params
 * @param {string} params.channelName - required
 * @param {string} params.type - required, postback type
 * @param {string} params.value - required, postback value
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @returns {string} base64 encoded params
 */
var encode = function encode(params) {
  if (_typeof(params) !== 'object') {
    throw new Error('Params should be object');
  }

  var channelName = params.channelName,
      type = params.type,
      value = params.value;

  if (!channelName || !type || !value) {
    throw new Error('Required param is missing');
  }

  if ((0, _helpers.isNotString)(channelName) || (0, _helpers.isNotString)(type) || (0, _helpers.isNotString)(value)) {
    throw new Error('Required param of wrong type');
  }

  if (type !== 'event' && type !== 'text') {
    throw new Error('Wrong value for type');
  }

  var language = params.language,
      region = params.region,
      set = params.set;
  var deeplinkParams = {
    t: type === 'event' ? 'e' : 't',
    v: value.trim(),
    l: language,
    r: region,
    s: set
  };
  return "enc__".concat((0, _helpers.encoder)(JSON.stringify(deeplinkParams)));
};

var _default = encode;
exports["default"] = _default;