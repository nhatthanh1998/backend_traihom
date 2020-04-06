import mongoose from "mongoose"


const ItemSchema = new mongoose.Schema({
    itemUrl: {
        type: String
    }
})

export const Item = mongoose.model('Item', ItemSchema);
