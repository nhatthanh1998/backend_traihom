"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _categories = require("./categories");

Object.keys(_categories).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _categories[key];
    }
  });
});