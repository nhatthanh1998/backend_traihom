"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDatabase = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose.default.Promise = global.Promise;

const connectDatabase = MONGO_URI => {
  _mongoose.default.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

exports.connectDatabase = connectDatabase;