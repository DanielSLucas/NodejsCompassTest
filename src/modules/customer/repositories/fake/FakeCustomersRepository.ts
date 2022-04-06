import { Customer } from "@prisma/client";
import { randomUUID } from "crypto";
import { CreateCustomerDTO } from "modules/customer/dtos/createCustomer";
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
}

export { FakeCustomersRepository };
