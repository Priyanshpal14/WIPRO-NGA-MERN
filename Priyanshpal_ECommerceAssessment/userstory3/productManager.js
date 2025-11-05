var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decorator to log price/stock changes
// This is a property decorator that replaces the property with a getter/setter pair.
function LogChange(target, propertyKey) {
    let value = target[propertyKey];
    const getter = function () {
        return value;
    };
    const setter = function (newVal) {
        if (newVal !== value) {
            // Log the change. 'this' refers to the instance of the Product class.
            console.log(`[LogChange] Property "${propertyKey}" of product ID ${this.id} changed from ${value} to ${newVal}`);
            value = newVal;
        }
    };
    // Redefine the property with the new getter and setter
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}
// Class Product implementing IProduct
class Product {
    constructor(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
}
__decorate([
    LogChange
], Product.prototype, "price", void 0);
__decorate([
    LogChange
], Product.prototype, "stock", void 0);
// Product Management Module
class ProductManager {
    constructor() {
        // Store products in a Map for easy lookup by ID
        this.products = new Map();
        // Initial data
        this.addProduct(new Product(101, "Wireless Mouse", "Electronics", 25.99, 50));
        this.addProduct(new Product(102, "Hardcover Notebook", "Stationery", 12.50, 120));
        this.addProduct(new Product(103, "Ergonomic Chair", "Furniture", 299.99, 15));
    }
    addProduct(product) {
        this.products.set(product.id, product);
    }
    updatePrice(id, newPrice) {
        const product = this.products.get(id);
        if (product) {
            product.price = newPrice; // Decorator will log the change
        }
    }
    updateStock(id, newStock) {
        const product = this.products.get(id);
        if (product) {
            product.stock = newStock; // Decorator will log the change
        }
    }
    // display products using for...of
    displayAllProducts() {
        console.log("\n--- Current Product Inventory ---");
        for (const [id, product] of this.products) {
            console.log(`ID: ${id}, Name: ${product.name}, Category: ${product.category}, Price: $${product.price.toFixed(2)}, Stock: ${product.stock}`);
        }
        console.log("---------------------------------");
    }
}
const manager = new ProductManager();
// Initial display
manager.displayAllProducts();
// Update price and stock to trigger the decorator
console.log("\n--- Updating Product Data ---");
manager.updatePrice(101, 29.99);
manager.updateStock(102, 100);
manager.updateStock(103, 15); // No change, no log
// Final display
manager.displayAllProducts();
const productTuple = [104, "Water Bottle", 200];
console.log(`\nExample Tuple: [${productTuple[0]}, ${productTuple[1]}, ${productTuple[2]}]`);
