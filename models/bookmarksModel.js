const mongoose = require("mongoose");
const User = require("./userModel")
const Products = require("./productModel")
const { Schema } = mongoose;

const bookmarksSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    products: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Products
        }
    }]
}, {
    timestamps: true
}

)

module.exports = mongoose.model("bookmarks", bookmarksSchema);