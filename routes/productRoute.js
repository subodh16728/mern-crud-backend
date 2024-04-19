const express = require("express");
const productController = require("../controllers/productController");
const productRoute = express.Router()

productRoute.get("/", productController.getProduct);
productRoute.post("/add", productController.addProduct);
productRoute.get("/id", productController.getProductByIdQuery);
productRoute.get("/:id", productController.getProductById);
productRoute.put("/edit/:id", productController.updateProduct)
productRoute.delete("/delete/:id", productController.deleteProduct)

module.exports = productRoute;