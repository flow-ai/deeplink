"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uncutType = exports.isNotString = exports.encoder = exports.decoder = exports.cutType = void 0;
var TYPES = {
  event: 'e',
  text: 't'
};
/**
 * 
 * @param {string} str 
 * @returns {string}
 * Returns base64 encoded string
 */

var encoder = function encoder(str) {
  try {
    if (typeof btoa !== 'undefined') {
      return btoa(str);
    }
  } catch (err) {
    if (err.message !== 'btoa is not defined') {
      throw err;
    }
  }

  return Buffer.from(str).toString('base64');
};
/**
 * 
 * @param {string} str 
 * @returns {string}
 * Accepts base64 string and returns decoded result
 */


exports.encoder = encoder;

var decoder = function decoder(str) {
  try {
    if (typeof atob !== 'undefined') {
      return atob(str);
    }
  } catch (err) {
    if (err.message !== 'atob is not defined') {
      throw err;
    }
  }

  return Buffer.from(str, 'base64').toString();
};
/**
 * 
 * @param {any} str 
 * @returns {boolean}
 */


exports.decoder = decoder;

var isNotString = function isNotString(str) {
  return typeof str !== 'string';
};
/**
 * 
 * @param {string} fullType 
 * @returns {string}
 */


exports.isNotString = isNotString;

var cutType = function cutType(fullType) {
  return TYPES[fullType] || TYPES.text;
};
/**
 * 
 * @param {string} shortType 
 * @returns {string}
 */


exports.cutType = cutType;

var uncutType = function uncutType(shortType) {
  return Object.keys(TYPES).find(function (type) {
    return TYPES[type] === shortType;
  });
};

exports.uncutType = uncutType;