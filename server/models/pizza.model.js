const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["CarryOut", "Delivery", "DineIn"],
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
    },
    crust: {
      type: String,
      enum: ["Thin", "Regular", "Thick"],
    },
    toppings: {
      type: String,
      enum: [
        "Pepperoni",
        "Mushrooms",
        "Green Peppers",
        "Black Olives",
        "Onions",
        "Italian Sausage",
        "Tomatoes (Fresh or Sun-dried)",
        "Spinach",
        "Feta Cheese"
      ],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderQuantity: {
        type: Number,
        default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pizza", PizzaSchema);
