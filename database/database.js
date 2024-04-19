const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connection to MongoDB is successfull`)
    }
    catch (err) {
        console.log(`Connection to MongoDB failed`)
    }
}

module.exports = connectDB;