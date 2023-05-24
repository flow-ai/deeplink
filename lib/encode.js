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
 * @param {string} params.value - required, event name, flowImmutableId or text
 * @param {string} params.channelName - optional
 * @param {string} params.language - optional
 * @param {string} params.region - optional
 * @param {string} params.set - optional
 * @param {Array<{}>} params.params - optional
 * @param {string} params.type - optional, event, flow or text
 * @param {string} params.buttonId - optional
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
      type = params.type,
      buttonId = params.buttonId;
  var deeplinkParams = {
    v: value.trim(),
    l: language,
    r: region,
    s: set,
    t: (0, _helpers.cutType)(type),
    b: buttonId
  };

  if (Array.isArray(params.params)) {
    deeplinkParams.p = params.params.map(function (param) {
      return {
        l: param.label,
        v: param.value
      };
    });
  } else if (params.params && _typeof(params.params) === 'object') {
    deeplinkParams.p = {};
    Object.keys(params.params).forEach(function (key) {
      deeplinkParams.p[key] = [{
        v: params.params[key][0].value
      }];
    });
  }

  return "__".concat((0, _helpers.encoder)(JSON.stringify(deeplinkParams)));
};

var _default = encode;
exports["default"] = _default;