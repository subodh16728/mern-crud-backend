const express = require("express");
const bookmarksController = require("../controllers/bookmarksController");
const bookmarksRoute = express.Router()

bookmarksRoute.get("/bookmarks", bookmarksController.getBookmarks)
bookmarksRoute.post("/bookmarks/add", bookmarksController.addBookmarks)

module.exports = bookmarksRoute;