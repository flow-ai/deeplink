"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotString = exports.encoder = exports.decoder = void 0;

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

exports.decoder = decoder;

var isNotString = function isNotString(str) {
  return typeof str !== 'string';
};

exports.isNotString = isNotString;