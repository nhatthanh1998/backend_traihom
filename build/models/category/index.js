"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const CategorySchema = new _mongoose.default.Schema({
  categoryName: {
    type: String
  },
  categoryType: {
    type: Number
  },
  items: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Item"
  }]
});

const Category = _mongoose.default.model('Category', CategorySchema);

exports.Category = Category;