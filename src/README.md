### Explanation for solution

- We imported our store.

- The variable `discountedProducts` is an array of all products on discount.
- The variable `twoForOneDiscount` is an array that holds all products on 2 for 1 discount
- The variable `fivePercentDiscount` is an array that holds all products that has 5% off discount.
This variables provides an efficient way of adding or removing products on discount without modifying their respective pricing rule.

- The variable `cart` is an object that holds scanned products and their units. It's more efficient to use an object rather than defining variables for each product in the store and variabbles to hold their count respectively, also this `cart` can hold any future product(s) that we may add to our store in the future.

- The `totalPrice` variable is a number that holds the total price of all  products have been scanned and their price rules have been respectively applied to them.

- The `scan` function adds item to the `cart`.
It takes in a string as a parameter, when the function is invoked, it adds the product/item selected by thhe user to the cart, if the product exist in the cart it will increment it by 1, else it will add the product and set it's value to 1.

- The function `pricingRules` implement each pricing rules. 
It loops over all of the object(`cart`) properties(key and value) and then handles the pricing rules. 

The first pricing rule is the `twoForOneDiscount` rule. 
The logical condition checks if the current product being iterated is in the `twoForOneDiscount` array, if true, then we check if the unit of this product is equal to or more than 2, if true, we call the `Math.ceil` method to round a number up to the next integer, or remain the same if it is already an integer after dividing the unit by 2 and multiply the result by the price of that product and add it to total, else add the price of that product to `totalPrice`.

The second pricing rule is the `fivePercentDiscount` rule.
The logical condition checks if the current product being iterated is in the `fivePercentDiscount` array, if true, then we check if the unit of this product is equal to or more than 3, if true, we multiply unit of the product by its price and store it in a variable called `getPriceOfUnit`, next, we get calculate and store the result of 5% off all unit to the variable `getFivePercentOfUnit`, next we add the result of `getPriceOfUnit` minus `getFivePercentOfUnit` to `totalPrice`.
Then we return `totalPrice` at the end of the loop.

- The function `productsWithoutDicount` handles product without any discount or pricing rules attached to it.
It takes an object, loop over it, while checking if any of the product is not inclusive in `discountedProducts`, if the product is not included, it adds the price of the product to `totalPrice` and return it.

- The function `checkout` invoke the `pricingRules` and `productsWithoutDicount` functions and return return `totalPrice` parse float with 2 decimal places.
