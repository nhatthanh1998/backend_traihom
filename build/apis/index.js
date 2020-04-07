"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _express = require("express");

var apiRouter = _interopRequireWildcard(require("./routes"));

const api = (0, _express.Router)();
exports.api = api;
api.use("/categories", apiRouter.categoryRouter);