"use strict";
// ============================================
// ENUMS
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerManager = exports.VIPCustomer = exports.Customer = exports.RegistrationStatus = exports.CustomerType = void 0;
var CustomerType;
(function (CustomerType) {
    CustomerType["REGULAR"] = "REGULAR";
    CustomerType["VIP"] = "VIP";
    CustomerType["CORPORATE"] = "CORPORATE";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
var RegistrationStatus;
(function (RegistrationStatus) {
    RegistrationStatus["PENDING"] = "PENDING";
    RegistrationStatus["APPROVED"] = "APPROVED";
    RegistrationStatus["REJECTED"] = "REJECTED";
})(RegistrationStatus || (exports.RegistrationStatus = RegistrationStatus = {}));
// ============================================
// DECORATORS
// ============================================
// Logging Decorator - logs method calls
function LogMethod(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`[LOG] Calling method: ${propertyKey}`);
        console.log(`[LOG] Arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`[LOG] Result:`, result);
        return result;
    };
    return descriptor;
}
// Validation Decorator - validates email format
function ValidateEmail(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const customer = args[0];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (customer && customer.email && !emailRegex.test(customer.email)) {
            console.error(`[VALIDATION ERROR] Invalid email format: ${customer.email}`);
            throw new Error("Invalid email format");
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// ============================================
// CLASSES
// ============================================
// Base Person Class
class Person {
    id;
    name;
    email;
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
// Customer Class extending Person
class Customer extends Person {
    customerType;
    registrationDate;
    eventRegistrations = [];
    constructor(id, name, email, customerType) {
        super(id, name, email);
        this.customerType = customerType;
        this.registrationDate = new Date();
    }
    getInfo() {
        return `Customer: ${this.name} (${this.customerType}) - ${this.email}`;
    }
    // Using Tuple for event registration (eventId, eventName, status)
    registerForEvent(eventData) {
        const [eventId, eventName, status] = eventData;
        this.eventRegistrations.push({
            eventId,
            eventName,
            registrationStatus: status,
        });
    }
    getEventRegistrations() {
        return this.eventRegistrations;
    }
    // Returns tuple with customer summary: [id, name, type, event count]
    getSummary() {
        return [
            this.id,
            this.name,
            this.customerType,
            this.eventRegistrations.length,
        ];
    }
}
exports.Customer = Customer;
// VIP Customer with additional benefits
class VIPCustomer extends Customer {
    loyaltyPoints;
    constructor(id, name, email, loyaltyPoints = 0) {
        super(id, name, email, CustomerType.VIP);
        this.loyaltyPoints = loyaltyPoints;
    }
    addLoyaltyPoints(points) {
        this.loyaltyPoints += points;
    }
    getInfo() {
        return `${super.getInfo()} | Loyalty Points: ${this.loyaltyPoints}`;
    }
}
exports.VIPCustomer = VIPCustomer;
// ============================================
// CUSTOMER MANAGER (with Decorators)
// ============================================
var CustomerManager_1;
let CustomerManager = CustomerManager_1 = class CustomerManager {
    customers = new Map();
    addCustomer(customer) {
        this.customers.set(customer.id, customer);
        console.log(`Customer added successfully: ${customer.name}`);
    }
    getCustomer(id) {
        return this.customers.get(id);
    }
    getAllCustomers() {
        return Array.from(this.customers.values());
    }
    updateCustomerStatus(id, status) {
        const customer = this.customers.get(id);
        if (customer) {
            const registrations = customer.getEventRegistrations();
            const firstRegistration = registrations[0];
            if (firstRegistration) {
                firstRegistration.registrationStatus = status;
                return true;
            }
        }
        return false;
    }
    // ============================================
    // ITERATOR IMPLEMENTATION
    // ============================================
    [Symbol.iterator]() {
        const customers = Array.from(this.customers.values());
        let index = 0;
        return {
            next() {
                const currentCustomer = customers[index++];
                if (currentCustomer) {
                    return {
                        value: currentCustomer,
                        done: false,
                    };
                }
                else {
                    return {
                        done: true,
                        value: undefined,
                    };
                }
            },
        };
    }
    // Statistics using tuple: [total, regular, vip, corporate]
    getStatistics() {
        let regular = 0;
        let vip = 0;
        let corporate = 0;
        for (const customer of this.customers.values()) {
            switch (customer.customerType) {
                case CustomerType.REGULAR:
                    regular++;
                    break;
                case CustomerType.VIP:
                    vip++;
                    break;
                case CustomerType.CORPORATE:
                    corporate++;
                    break;
            }
        }
        return [this.customers.size, regular, vip, corporate];
    }
};
exports.CustomerManager = CustomerManager;
__decorateClass([
    ValidateEmail,
    LogMethod
], CustomerManager.prototype, "addCustomer", 1);
__decorateClass([
    LogMethod
], CustomerManager.prototype, "getCustomer", 1);
__decorateClass([
    LogMethod
], CustomerManager.prototype, "updateCustomerStatus", 1);
exports.CustomerManager = CustomerManager = CustomerManager_1 = __decorateClass([
    (void 0)
], CustomerManager);
// ============================================
// DEMO USAGE
// ============================================
function demonstrateModule() {
    console.log("=== Customer Registration Module Demo ===\n");
    const manager = new CustomerManager();
    // Create customers
    const customer1 = new Customer("C001", "John Doe", "john@example.com", CustomerType.REGULAR);
    const customer2 = new VIPCustomer("C002", "Jane Smith", "jane@example.com", 100);
    const customer3 = new Customer("C003", "Acme Corp", "contact@acme.com", CustomerType.CORPORATE);
    // Add customers (triggers decorators)
    console.log("\n=== Adding Customers ===");
    manager.addCustomer(customer1);
    manager.addCustomer(customer2);
    manager.addCustomer(customer3);
    console.log("\n=== Customer Information ===");
    console.log(customer1.getInfo());
    console.log(customer2.getInfo());
    console.log(customer3.getInfo());
    // Register customers for events using tuples
    console.log("\n=== Event Registrations ===");
    customer1.registerForEvent([
        "E001",
        "Tech Conference 2025",
        RegistrationStatus.APPROVED,
    ]);
    customer2.registerForEvent([
        "E001",
        "Tech Conference 2025",
        RegistrationStatus.APPROVED,
    ]);
    customer2.registerForEvent([
        "E002",
        "Business Summit",
        RegistrationStatus.PENDING,
    ]);
    console.log("Events registered successfully!");
    // Display customer summaries using tuples
    console.log("\n=== Customer Summaries (Tuples) ===");
    const [id1, name1, type1, events1] = customer1.getSummary();
    console.log(`ID: ${id1}, Name: ${name1}, Type: ${type1}, Events: ${events1}`);
    const [id2, name2, type2, events2] = customer2.getSummary();
    console.log(`ID: ${id2}, Name: ${name2}, Type: ${type2}, Events: ${events2}`);
    // Use iterator
    console.log("\n=== Iterating Through Customers ===");
    for (const customer of manager) {
        console.log(`- ${customer.name} (${customer.customerType})`);
    }
    // Get statistics using tuple
    console.log("\n=== Statistics (Tuple) ===");
    const [total, regular, vip, corporate] = manager.getStatistics();
    console.log(`Total: ${total}, Regular: ${regular}, VIP: ${vip}, Corporate: ${corporate}`);
    // Test retrieving a customer
    console.log("\n=== Retrieve Customer ===");
    const retrievedCustomer = manager.getCustomer("C001");
    if (retrievedCustomer) {
        console.log(`Retrieved: ${retrievedCustomer.getInfo()}`);
    }
    // Update customer status
    console.log("\n=== Update Customer Status ===");
    const updated = manager.updateCustomerStatus("C002", RegistrationStatus.APPROVED);
    console.log(`Status update result: ${updated}`);
    // Test email validation (will throw error with invalid email)
    console.log("\n=== Testing Email Validation ===");
    try {
        const invalidCustomer = new Customer("C004", "Invalid User", "invalid-email", CustomerType.REGULAR);
        manager.addCustomer(invalidCustomer);
    }
    catch (error) {
        console.log("✓ Validation working! Error:", error.message);
    }
    console.log("\n=== Demo Complete ===");
}
// Helper function for decorator metadata (TypeScript compiler generates this)
function __decorateClass(decorators, target, key, kind) {
    var result = kind > 1 ? void 0 : kind ? Object.getOwnPropertyDescriptor(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
        if (decorator = decorators[i])
            result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
        Object.defineProperty(target, key, result);
    return result;
}
// Run the demonstration
demonstrateModule();
//# sourceMappingURL=customer-registration.js.map