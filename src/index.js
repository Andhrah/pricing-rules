const store = require("./store.json");

let discountedProducts = ["VOUCHER", "TSHIRT"];

// More than one product could be on this discount
let twoForOneDiscount = ["VOUCHER"];

// More than one product could be on this discount
let fivePercentDiscount = ["TSHIRT"];

// This variable 
let cart = {};
let totalPrice = 0;

const scan = (str) => {
  return str in cart ? cart[str]++ : cart[str] = 1;
}

/**
 * Implement each Pricing Rules
 */
const pricingRules = (obj) => {
  for(const [key, value] of Object.entries(obj)) {

    // Price Rule #1: buy two of the same product, get one free(2-for-1 special on VOUCHER items)
    if(twoForOneDiscount.includes(key)){
      if(value >= 2) {
        // (2v - 1v = pay for 1) (3v - 1v = pay for 2) (5v - 2v = pay for 3) (7v - 3v) (6v - 3v) (9v - 4v) (12v - 6v)
        totalPrice += Math.ceil(value / 2) * store[key].price;
      } else {
        totalPrice += store[key].price;
      } 
    }

    // Price Rule #2: bulk purchases (buying x or more of a product, the price of that product is reduced), buy 3 or more TSHIRT items, the price per unit should be 19.00€.

    if(fivePercentDiscount.includes(key)){
      if(value >= 3) {
        const getPriceOfUnit = value * store[key].price;
        const getFivePercentOfUnit = getPriceOfUnit * 5 / 100
        // Apply $5 discount on each
        totalPrice += getPriceOfUnit - getFivePercentOfUnit;
      } else {
        totalPrice += store[key].price;
      }
    }
  }
  return totalPrice;
}

const productsWithoutDicount = (obj) => {
  for(const key in obj){
    if(!discountedProducts.includes(key)){
      totalPrice += store[key].price;
    }
  }
  return totalPrice;
}

const checkout = (obj) => {
  pricingRules(obj);
  productsWithoutDicount(obj);
  return `${parseFloat(totalPrice).toFixed(2)}€`
}

// uncomment the line of code
scan("VOUCHER");
scan("TSHIRT");
scan("MUG");

console.log(checkout(cart));
