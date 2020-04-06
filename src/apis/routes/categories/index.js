import { Router } from "express";
import { Category, Item } from "../../../models"

import multer from "multer"
import cloudinary from "cloudinary"
import fs from "fs"

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage })
var API_KEY = "719885694626182"
var API_SERECT = "ntLl6-9WLZ0QS9L9ceeaRZ7_7Lk"

cloudinary.v2.config({
    api_key: API_KEY,
    api_secret: API_SERECT,
    cloud_name: "livestreamzz"
})


export const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
    res.status(200).send(await Category.find().lean());
})

categoryRouter.post("/", async (req, res) => {
    const { categoryName, categoryType } = req.body
    return res.status(200).send(await Category.create({
        categoryName,
        categoryType,
        items: []
    }));
})



categoryRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    return res.status(200).send(await Category.findById(id).lean());
})


categoryRouter.post("/:id/items", upload.single("image"), async (req, res) => {
    const { id } = req.params
    let responseData = await cloudinary.v2.uploader.upload(req.file.path)
    const { secure_url } = responseData;
    const newItems = await Item.create({
        itemUrl: secure_url
    });
    let category = await Category.findById(id);
    category.items = [...category.items, newItems];
    await category.save();
    fs.unlink(req.file.path, error => {
        if (error) {
            console.log(error);
        }
    });
    res.status(200).send({ message: "OK" });
})



categoryRouter.get("/:id/items", async (req, res) => {
    const { id } = req.params;
    const data = await Category.findById(id).populate("items").lean();
    return res.status(200).send(data.items);
})