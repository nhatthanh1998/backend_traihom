"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const ItemSchema = new _mongoose.default.Schema({
  itemUrl: {
    type: String
  }
});

const Item = _mongoose.default.model('Item', ItemSchema);

exports.Item = Item;