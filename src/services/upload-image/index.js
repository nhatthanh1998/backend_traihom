import fs from "fs"
import cloudinary from "cloudinary"


var API_KEY = "719885694626182";
var API_SERECT = "ntLl6-9WLZ0QS9L9ceeaRZ7_7Lk";

cloudinary.v2.config({
    api_key: API_KEY,
    api_secret: API_SERECT,
    cloud_name: "livestreamzz"
});


export class UploadImageService {
    static async uploadFileToCloud({ filePath }) {
        let responseData = await cloudinary.v2.uploader.upload(filePath)
        fs.unlink(filePath, error => {
            if (error) {
                console.log(error)
            }
        })
        return responseData
    }
}