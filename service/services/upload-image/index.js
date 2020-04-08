"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadImageService = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var API_KEY = "719885694626182";
var API_SERECT = "ntLl6-9WLZ0QS9L9ceeaRZ7_7Lk";

_cloudinary.default.v2.config({
  api_key: API_KEY,
  api_secret: API_SERECT,
  cloud_name: "livestreamzz"
});

class UploadImageService {
  static async uploadFileToCloud({
    filePath
  }) {
    let responseData = await _cloudinary.default.v2.uploader.upload(filePath);

    _fs.default.unlink(filePath, error => {
      if (error) {
        console.log(error);
      }
    });

    return responseData;
  }

}

exports.UploadImageService = UploadImageService;