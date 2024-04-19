const express = require("express");
const userController = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/register", userController.userSignUp);
userRoute.post("/login", userController.userSignin)
userRoute.get("/user/:id", userController.getUserByID)

module.exports = userRoute;
