// 🛍️ E-Commerce Cart System
// 🛒 Create a shopping cart system that manages products and their quantities.
//
// 1. Implement a class `ShoppingCart<T>` to handle products in a cart.
// 2. Implement a method `addToCart` that adds a product to the cart and updates the quantity if it already exists.
// 3. Implement a method `removeFromCart` that removes a product from the cart completely.
// 4. Implement a method `updateQuantity` that updates the quantity of a product in the cart.
// 5. Implement a method `getProductsOfCategory` that accepts a string and returns an array of items from the cart that match that category.
// 6. Implement a method `getTotalPrice` that returns the total cost of all items in the cart.
var Category;
(function (Category) {
    Category["Fruit"] = "Fruit";
    Category["Vegetable"] = "Vegetable";
    Category["Electronics"] = "Electronics";
    Category["Pastry"] = "Pastry";
    Category["Cereal"] = "Cereal";
})(Category || (Category = {}));
class ShoppingCart {
    cart = [];
    addToCart(product) {
        let thisProduct = this.cart.find((item) => item.id === product.id);
        if (!thisProduct) {
            this.cart.push(product);
            return `${product.name} added to cart.`;
        }
        else {
            thisProduct.quantity += product.quantity;
            return `Updated quantity of ${product.name} to ${thisProduct.quantity}.`;
        }
    }
    updateQuantity(id, qty) {
        let thisProduct = this.cart.find((item) => item.id === id);
        if (!thisProduct)
            return `Product not found`;
        thisProduct.quantity = qty;
        return `Updated quantity of ${thisProduct.name} to ${thisProduct.quantity}.`;
    }
    getTotalPrice() {
        let total = this.cart.reduce((acc, item) => acc + item.price, 0);
        return total;
    }
    getProductsOfCategory(category) {
        let itemsOfCategory = this.cart.filter((item) => item.category === category);
        if (itemsOfCategory.length === 0) {
            return `Items of ${category} not found`;
        }
        return itemsOfCategory;
    }
    removeFromCart(id) {
        let removedItem = this.cart.find((item) => item.id === id);
        let newCart = this.cart.filter((item) => item.id !== id);
        return `${removedItem.name} removed from cart.`;
    }
}
// Test cases
const cart = new ShoppingCart();
console.log(cart.addToCart({ id: 1, name: "Headphones", price: 50, quantity: 1, category: Category.Electronics })); // "Headphones added to cart."
console.log(cart.addToCart({ id: 2, name: "Keyboard", price: 100, quantity: 1, category: Category.Electronics })); // "Keyboard added to cart."
console.log(cart.updateQuantity(1, 3)); // "Updated quantity of Headphones to 3."
console.log(cart.getProductsOfCategory("Electronics")); // Should return all electronics
console.log(cart.getTotalPrice()); // Should return the total cost of items
console.log(cart.removeFromCart(2)); // "Keyboard removed from cart."
console.log(cart.getProductsOfCategory('Fruit'));
