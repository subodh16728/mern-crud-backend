const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const offerRoute = require("./routes/offerRoute");
const userRoute = require("./routes/userRoute");
const bookmarksRoute = require("./routes/bookmarksRoute")
const connectDB = require("./database/database.js");

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const PORT = process.env.PORT || 5000

// default route
app.use("/api/products", productRoute);
app.use("/api", userRoute);
app.use("/api/offers", offerRoute)
app.use("/api", bookmarksRoute)
// app.use("/api/users", userRoute)

connectDB()

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})