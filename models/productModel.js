const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        description: { type: String, required: true, unique: true },
        category: {
            type: String,
            required: true
        },
        features: [{
            title: { type: String, minlength: 3, required: true },
            value: { type: String, minlength: 3, required: true }
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("products", productSchema);