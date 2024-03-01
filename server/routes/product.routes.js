const ProductController = require("../controllers/product.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get("/api/products/:userId", authenticate, ProductController.getAllProducts);
    app.post("/api/createProduct", ProductController.createProduct);
}