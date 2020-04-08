"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = require("dotenv");

var _apis = require("../apis");

var _db = require("../db");

const app = (0, _express.default)();

async function startServer() {
  await (0, _dotenv.config)();
  await Promise.all([(0, _db.connectDatabase)(process.env.MONGO_URI), app.use((0, _cors.default)()), app.use(_bodyParser.default.urlencoded({
    extended: true
  })), app.use(_bodyParser.default.json()), app.use((0, _helmet.default)()), app.use((0, _compression.default)()), app.use("/api", _apis.api)]);
  app.listen(process.env.PORT, () => {
    console.log(" server start at port", process.env.PORT);
  });
  (0, _morgan.default)("tiny");
}