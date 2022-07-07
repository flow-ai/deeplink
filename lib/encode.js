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
 * @param {string} params.value - required, event name or text
 * @param {string} params.channelName - optional
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @param {Array<{}>} params.params - optional
 * @param {string} params.type - optional, event or  text
 * @returns {string} base64 encoded params
 */
var encode = function encode(params) {
  if (_typeof(params) !== 'object') {
    throw new Error('Params should be object');
  }

  var value = params.value;

  if (!value) {
    throw new Error('Required param is missing');
  }

  if ((0, _helpers.isNotString)(value)) {
    throw new Error('Required param of wrong type');
  }

  var language = params.language,
      region = params.region,
      set = params.set,
      type = params.type;
  var deeplinkParams = {
    v: value.trim(),
    l: language,
    r: region,
    s: set,
    t: (0, _helpers.cutType)(type)
  };

  if (params.params) {
    deeplinkParams.p = params.params.map(function (param) {
      return {
        l: param.label,
        v: param.value
      };
    });
  }

  return "__".concat((0, _helpers.encoder)(JSON.stringify(deeplinkParams)));
};

var _default = encode;
exports["default"] = _default;