const Product = require("../models/product.model");
const jwt = require('jsonwebtoken')

module.exports = {
    createProduct: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            req.body.userId = decodedJwt.payload._id;
            console.log('createproduct:', req.body);
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getAllProducts: async (req, res) => {
        const id = req.params.userId;
        try{
            const products = await Product.find({userId: id}).populate("userId");
            res.status(200).json(products);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}