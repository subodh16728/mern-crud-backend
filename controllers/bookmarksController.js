const Bookmarks = require("../models/bookmarksModel");
const dotenv = require("dotenv");
dotenv.config()
const { verifyUser } = require("./userController")

// get all bookmarks
exports.getBookmarks = async (req, res) => {
    verifyUser(req, res, async () => {
        const userID = req.query.userID;
        try {
            const response = await Bookmarks.findOne({ userID: userID })
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error)
        }
    })
}

// adding to bookmarks
exports.addBookmarks = async (req, res) => {
    verifyUser(req, res, async () => {
        try {

            const userID = req.body.userID
            const products = req.body.products

            if (!userID) {
                return res.status(400).json({
                    message: "userID is required",
                    success: false,
                    error: true
                });
            }

            const existingUser = await Bookmarks.findOne({ userID })
            if (existingUser === null) {
                const savedData = await Bookmarks.create({ userID: req.body.userID, products: [{ productID: products[0].productID }] })
                res.status(201).json({
                    message: `Bookmark added sucessfully`,
                    data: savedData,
                    success: true,
                    error: false
                })
            }
            else {
                const alreadyMarkedProductId = [];
                {
                    existingUser.products.map((item) => {
                        alreadyMarkedProductId.push(item.productID.toString())
                    })
                }

                if (!alreadyMarkedProductId.includes(products[0].productID)) {
                    existingUser.products.push({ productID: products[0].productID });
                    await existingUser.save()
                    return res.status(201).json({
                        message: `Bookmark added sucessfully`,
                        success: true,
                        error: false
                    });
                } else {

                    const index = alreadyMarkedProductId.indexOf(products[0].productID)
                    existingUser.products.splice(index, 1)
                    await existingUser.save()

                    return res.status(200).json({
                        message: "Bookmark removed successfully",
                        success: true,
                        error: false
                    })
                }

            }
        } catch (error) {
            res.status(500).json({
                message: `Error: Try again!`,
                error: true,
                success: false
            })
        }
    })
}
