declare enum CustomerType {
    REGULAR = "REGULAR",
    VIP = "VIP",
    CORPORATE = "CORPORATE"
}
declare enum RegistrationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
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
declare abstract class Person {
    id: string;
    name: string;
    email: string;
    constructor(id: string, name: string, email: string);
    abstract getInfo(): string;
}
declare class Customer extends Person implements ICustomer {
    customerType: CustomerType;
    registrationDate: Date;
    private eventRegistrations;
    constructor(id: string, name: string, email: string, customerType: CustomerType);
    getInfo(): string;
    registerForEvent(eventData: [string, string, RegistrationStatus]): void;
    getEventRegistrations(): IEventRegistration[];
    getSummary(): [string, string, CustomerType, number];
}
declare class VIPCustomer extends Customer {
    loyaltyPoints: number;
    constructor(id: string, name: string, email: string, loyaltyPoints?: number);
    addLoyaltyPoints(points: number): void;
    getInfo(): string;
}
declare class CustomerManager implements ICustomerManager, Iterable<Customer> {
    private customers;
    addCustomer(customer: Customer): void;
    getCustomer(id: string): Customer | undefined;
    getAllCustomers(): Customer[];
    updateCustomerStatus(id: string, status: RegistrationStatus): boolean;
    [Symbol.iterator](): Iterator<Customer>;
    getStatistics(): [number, number, number, number];
}
export { Customer, VIPCustomer, CustomerManager, CustomerType, RegistrationStatus, ICustomer, IEventRegistration, ICustomerManager };
//# sourceMappingURL=Customer_module.d.ts.map