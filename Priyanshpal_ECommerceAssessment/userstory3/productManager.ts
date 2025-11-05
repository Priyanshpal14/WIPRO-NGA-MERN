// Interface IProduct
interface IProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

// Decorator to log price/stock changes
function LogChange(target: any, propertyKey: string) {
    let value = target[propertyKey];

    const getter = function(this: any) {
        return value;
    };

    const setter = function(this: any, newVal: any) {
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
class Product implements IProduct {
    id: number;
    name: string;
    category: string;
    
    @LogChange
    price: number;

    @LogChange
    stock: number;

    constructor(id: number, name: string, category: string, price: number, stock: number) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
}

// Product Management Module
class ProductManager {
    // Store products in a Map for easy lookup by ID
    private products: Map<number, Product> = new Map();

    constructor() {
        // Initial data
        this.addProduct(new Product(101, "Wireless Mouse", "Electronics", 25.99, 50));
        this.addProduct(new Product(102, "Hardcover Notebook", "Stationery", 12.50, 120));
        this.addProduct(new Product(103, "Ergonomic Chair", "Furniture", 299.99, 15));
    }

    addProduct(product: Product): void {
        this.products.set(product.id, product);
    }

    updatePrice(id: number, newPrice: number): void {
        const product = this.products.get(id);
        if (product) {
            product.price = newPrice; // Decorator will log the change
        }
    }

    updateStock(id: number, newStock: number): void {
        const product = this.products.get(id);
        if (product) {
            product.stock = newStock; // Decorator will log the change
        }
    }

    // display products using for...of
    displayAllProducts(): void {
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

// Type Annotations: Using a tuple type

type ProductTuple = [number, string, number]; // [id, name, stock]
const productTuple: ProductTuple = [104, "Water Bottle", 200];
console.log(`\nExample Tuple: [${productTuple[0]}, ${productTuple[1]}, ${productTuple[2]}]`);
