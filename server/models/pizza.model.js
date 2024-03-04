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
      type: Array,
      default: [],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    fav : {
      type: Boolean,
      default: false
    },
    methodPrice: {
      type: Number,
      default: function() {
        let price = 0;
        if(this.method === "CarryOut") price += 10;
        else if(this.method === "Delivery") price += 12;
        else if(this.method === "DineIn") price += 8;
        return price;
      }
    },
    sizePrice: {
      type: Number,
      default: function() {
        let price = 0;
        if(this.size === "Small") price += 8;
        else if(this.size === "Medium") price += 10;
        else if(this.size === "Large") price += 12;
        return price;
      }
    },
    crustPrice: {
      type: Number,
      default: function() {
        let price = 0;
        if(this.crust === "Thin") price += 1;
        else if(this.crust === "Regular") price += 2;
        else if(this.crust === "Thick") price += 3;
        return price;
      }
    },
    toppingsPrice: {
      type: Number,
      default: function() {
        let price = 0;
        this.toppings.forEach(topping => {
          if(topping === 'Pepperoni') price += 2;
          else if(topping === 'Sausage') price += 2;
          else if(topping === 'Bacon') price += 2;
          else if(topping === 'Mushrooms') price += 1;
          else if(topping === 'Onions') price += 1;
          else if(topping === 'Olives') price += 1;
          else if(topping === 'Pineapple') price += 2;
          else if(topping === 'Spinach') price += 1;
          else if(topping === 'Cheese') price += 2;
        });
        return price;
      }
    },
    // Calculate total price
    totalPrice: {
      type: Number,
      default: function() {
        let price = 0;
        price += this.methodPrice;
        price += this.sizePrice;
        price += this.crustPrice;
        price += this.toppingsPrice;
        price *= this.quantity;
        return price;
      }
    },
    pur : {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pizza", PizzaSchema);
