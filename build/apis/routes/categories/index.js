"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRouter = void 0;

var _express = require("express");

var _models = require("../../../models");

var _multer = _interopRequireDefault(require("multer"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer.default)({
  storage
});
var API_KEY = "719885694626182";
var API_SERECT = "ntLl6-9WLZ0QS9L9ceeaRZ7_7Lk";

_cloudinary.default.v2.config({
  api_key: API_KEY,
  api_secret: API_SERECT,
  cloud_name: "livestreamzz"
});

const categoryRouter = (0, _express.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.get("/", async (req, res) => {
  res.status(200).send((await _models.Category.find().lean()));
});
categoryRouter.post("/", async (req, res) => {
  const {
    categoryName,
    categoryType
  } = req.body;
  return res.status(200).send((await _models.Category.create({
    categoryName,
    categoryType,
    items: []
  })));
});
categoryRouter.get("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  return res.status(200).send((await _models.Category.findById(id).lean()));
});
categoryRouter.post("/:id/items", upload.single("image"), async (req, res) => {
  const {
    id
  } = req.params;
  let responseData = await _cloudinary.default.v2.uploader.upload(req.file.path);
  const {
    secure_url
  } = responseData;
  const newItems = await _models.Item.create({
    itemUrl: secure_url
  });
  let category = await _models.Category.findById(id);
  category.items = [...category.items, newItems];
  await category.save();

  _fs.default.unlink(req.file.path, error => {
    if (error) {
      console.log(error);
    }
  });

  res.status(200).send({
    message: "OK"
  });
});
categoryRouter.get("/:id/items", async (req, res) => {
  const {
    id
  } = req.params;
  const data = await _models.Category.findById(id).populate("items").lean();
  return res.status(200).send(data.items);
});