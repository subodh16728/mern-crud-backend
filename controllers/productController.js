const Products = require("../models/productModel");
const dotenv = require("dotenv");
const { verifyUser } = require("./userController")
dotenv.config()

// Get all products
exports.getProduct = (req, res) => {
    verifyUser(req, res, async () => {
        const searchQuery = req.query.search
        let query = {}

        if (searchQuery) {
            query = {
                $or: [
                    { title: { $regex: new RegExp(searchQuery, 'i') } },
                    { category: { $regex: new RegExp(searchQuery, 'i') } },
                    { description: { $regex: new RegExp(searchQuery, 'i') } }
                ]
            };
        }
        try {
            setTimeout(async () => {
                const products = await Products.find(query);
                res.status(200).json(products);
            }, 100)
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    })
}

// Add a product
exports.addProduct = (req, res) => {
    verifyUser(req, res, async () => {
        try {
            const NewProduct = await req.body;
            if (NewProduct != null) {
                const response = await Products.create(NewProduct)
                res.status(201).send(response)
            } else {
                res.status(400).send(`Empty data cannot be added`);
            }
        } catch (error) {
            res.status(400).send(error)
            console.log(`Bad request: ${error}`)
        }
    })
}

// updating product
exports.updateProduct = (req, res) => {
    verifyUser(req, res, async () => {
        try {
            const id = req.params.id;
            const modifiedData = req.body;
            const response = await Products.findByIdAndUpdate(id, modifiedData)
            res.status(204).send(`Product updated successfully: ${id}`)
        } catch (error) {
            res.status(404).send(error)
        }
    })
}

// fetch product by id through query
exports.getProductByIdQuery = (req, res) => {
    verifyUser(req, res, () => {

        const productID = req.query.productID;

        Products.findById({ _id: productID })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(400).send(err)
            })
    })
}

// fetch product by id
exports.getProductById = (req, res) => {
    try {
        verifyUser(req, res, async () => {
            const id = req.params.id;
            const data = await Products.findById(id);
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// delete product
exports.deleteProduct = (req, res) => {
    verifyUser(req, res, () => {
        const productID = req.params.id;
        Products.findByIdAndDelete(productID)
            .then((data) => {
                res.status(204).send(`Product deleted successfully`)
            })
            .catch((error) => {
                res.status(404).send(`Product does not exist: ${error}`)
            })
    })
} 