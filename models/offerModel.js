const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        expiry_date: { type: String, required: true },
        location: { type: String, required: true }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model("offers", offerSchema);