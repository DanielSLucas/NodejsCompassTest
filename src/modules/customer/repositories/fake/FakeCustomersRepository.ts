import { Customer } from "@prisma/client";
import { randomUUID } from "crypto";
import { CreateCustomerDTO } from "modules/customer/dtos/createCustomer";
import { CustomerFilters } from "modules/customer/services/FindCustomersService";
import { ICustomersRepository } from "../ICustomersRepository";

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  async createCustomer(customerData: CreateCustomerDTO): Promise<Customer> {
    const customer = {
      ...customerData,
      id: randomUUID(),
    };

    this.customers.push(customer);

    return customer;
  }

  async findCustomerByName(fullName: string): Promise<Customer | null> {
    return (
      this.customers.find(customer => customer.fullName === fullName) || null
    );
  }

  async findCustomers({ fullName }: CustomerFilters): Promise<Customer[]> {
    return this.customers.filter(customer => {
      const nameFilter = fullName ? customer.fullName === fullName : true;

      return nameFilter;
    });
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    return this.customers.find(customer => customer.id === id) || null;
  }

  async removeCustomerById(id: string): Promise<void> {
    const customerIndex = this.customers.findIndex(
      customer => customer.id === id,
    );
    this.customers.splice(customerIndex, 1);
  }
}

export { FakeCustomersRepository };
