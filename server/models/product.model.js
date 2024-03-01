const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [2, "Product name must be at least 2 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [10, "Product description must be at least 10 characters long"]
    },
    category: {
        type: String,
        enum:["Electronics", "Clothing", "Home", "Toys", "Sports", "Vehicles" ,"Other"],
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema)
