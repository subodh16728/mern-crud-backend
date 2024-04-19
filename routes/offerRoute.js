const express = require("express");
const offerController = require("../controllers/offerController");
const offerRoute = express.Router()

offerRoute.get("/", offerController.getOffers)
offerRoute.post("/add", offerController.addOffer)
offerRoute.get("/:id", offerController.getOfferById)

module.exports = offerRoute;