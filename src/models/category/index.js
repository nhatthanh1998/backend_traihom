import mongoose from "mongoose"


const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String
    },
    categoryType: {
        type: Number
    },
    items:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        }]

})

export const Category = mongoose.model('Category', CategorySchema);
