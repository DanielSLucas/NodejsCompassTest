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
}

export { FakeCustomersRepository };
