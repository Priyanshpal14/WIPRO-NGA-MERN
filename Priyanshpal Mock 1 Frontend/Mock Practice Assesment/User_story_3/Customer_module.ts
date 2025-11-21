// ============================================
// ENUMS
// ============================================

enum CustomerType {
  REGULAR = "REGULAR",
  VIP = "VIP",
  CORPORATE = "CORPORATE"
}

enum RegistrationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

// ============================================
// INTERFACES
// ============================================

interface ICustomer {
  id: string;
  name: string;
  email: string;
  customerType: CustomerType;
  registrationDate: Date;
}

interface IEventRegistration {
  eventId: string;
  eventName: string;
  registrationStatus: RegistrationStatus;
}

interface ICustomerManager {
  addCustomer(customer: Customer): void;
  getCustomer(id: string): Customer | undefined;
  getAllCustomers(): Customer[];
  updateCustomerStatus(id: string, status: RegistrationStatus): boolean;
}

// ============================================
// DECORATORS
// ============================================

// // Logging Decorator - logs method calls
// function LogMethod(
//   target: unknown,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ): PropertyDescriptor {
//   const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

//   descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
//     console.log(`[LOG] Calling method: ${propertyKey}`);
//     console.log(`[LOG] Arguments:`, args);
//     const result = originalMethod.apply(this, args);
//     console.log(`[LOG] Result:`, result);
//     return result;
//   };

//   return descriptor;
// }

// Validation Decorator - validates email format
function ValidateEmail(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    const customer = args[0] as Customer;
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
abstract class Person {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}

  abstract getInfo(): string;
}

// Customer Class extending Person
class Customer extends Person implements ICustomer {
  public registrationDate: Date;
  private eventRegistrations: IEventRegistration[] = [];

  constructor(
    id: string,
    name: string,
    email: string,
    public customerType: CustomerType
  ) {
    super(id, name, email);
    this.registrationDate = new Date();
  }

  getInfo(): string {
    return `Customer: ${this.name} (${this.customerType}) - ${this.email}`;
  }

  // Using Tuple for event registration (eventId, eventName, status)
  registerForEvent(eventData: [string, string, RegistrationStatus]): void {
    const [eventId, eventName, status] = eventData;
    this.eventRegistrations.push({
      eventId,
      eventName,
      registrationStatus: status,
    });
  }

  getEventRegistrations(): IEventRegistration[] {
    return this.eventRegistrations;
  }

  // Returns tuple with customer summary: [id, name, type, event count]
  getSummary(): [string, string, CustomerType, number] {
    return [
      this.id,
      this.name,
      this.customerType,
      this.eventRegistrations.length,
    ];
  }
}

// VIP Customer with additional benefits
class VIPCustomer extends Customer {
  constructor(
    id: string,
    name: string,
    email: string,
    public loyaltyPoints: number = 0
  ) {
    super(id, name, email, CustomerType.VIP);
  }

  addLoyaltyPoints(points: number): void {
    this.loyaltyPoints += points;
  }

  override getInfo(): string {
    return `${super.getInfo()} | Loyalty Points: ${this.loyaltyPoints}`;
  }
}

// ============================================
// CUSTOMER MANAGER (with Decorators)
// ============================================

class CustomerManager implements ICustomerManager, Iterable<Customer> {
  private customers: Map<string, Customer> = new Map();

  addCustomer(customer: Customer): void {
    this.customers.set(customer.id, customer);
    console.log(`Customer added successfully: ${customer.name}`);
  }

  getCustomer(id: string): Customer | undefined {
    return this.customers.get(id);
  }

  getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }

  updateCustomerStatus(id: string, status: RegistrationStatus): boolean {
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
  [Symbol.iterator](): Iterator<Customer> {
    const customers = Array.from(this.customers.values());
    let index = 0;

    return {
      next(): IteratorResult<Customer> {
        const currentCustomer = customers[index++];
        if (currentCustomer) {
          return {
            value: currentCustomer,
            done: false,
          };
        } else {
          return {
            done: true,
            value: undefined as unknown as Customer,
          };
        }
      },
    };
  }

  // Statistics using tuple: [total, regular, vip, corporate]
  getStatistics(): [number, number, number, number] {
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
}

// ============================================
// DEMO USAGE
// ============================================

function demonstrateModule(): void {
  console.log("=== Customer Registration Module Demo ===\n");

  const manager = new CustomerManager();

  // Create customers
  const customer1 = new Customer(
    "C001",
    "John Doe",
    "john@example.com",
    CustomerType.REGULAR
  );
  const customer2 = new VIPCustomer("C002", "Jane Smith", "jane@example.com", 100);
  const customer3 = new Customer(
    "C003",
    "Acme Corp",
    "contact@acme.com",
    CustomerType.CORPORATE
  );

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
  console.log(
    `Total: ${total}, Regular: ${regular}, VIP: ${vip}, Corporate: ${corporate}`
  );

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
    const invalidCustomer = new Customer(
      "C004",
      "Invalid User",
      "invalid-email",
      CustomerType.REGULAR
    );
    manager.addCustomer(invalidCustomer);
  } catch (error) {
    console.log("✓ Validation working! Error:", (error as Error).message);
  }

  console.log("\n=== Demo Complete ===");
}

// Run the demonstration
demonstrateModule();

// Export for module usage
export {
  Customer,
  VIPCustomer,
  CustomerManager,
  CustomerType,
  RegistrationStatus,
};
export type {
  ICustomer,
  IEventRegistration,
  ICustomerManager,
};