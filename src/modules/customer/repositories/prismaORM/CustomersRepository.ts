import { Customer } from "@prisma/client";
import { CreateCustomerDTO } from "modules/customer/dtos/createCustomer";
import { CustomerFilters } from "modules/customer/services/FindCustomersService";
import { prismaClient } from "../../../../shared/database";
import { ICustomersRepository } from "../ICustomersRepository";

class CustomersRepository implements ICustomersRepository {
  private repository = prismaClient.customer;

  async createCustomer(customerData: CreateCustomerDTO): Promise<Customer> {
    const customer = await this.repository.create({
      data: customerData,
    });

    return customer;
  }

  async findCustomerByName(fullName: string): Promise<Customer | null> {
    const customer = await this.repository.findUnique({
      where: {
        fullName,
      },
      include: {
        city: true,
      },
    });

    return customer;
  }

  async findCustomers({ fullName }: CustomerFilters): Promise<Customer[]> {
    const filters = {};

    if (fullName) {
      Object.assign(filters, { fullName });
    }

    const customers = await this.repository.findMany({
      where: filters,
      include: {
        city: true,
      },
    });

    return customers;
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    const customer = await this.repository.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });

    return customer;
  }
}
export { CustomersRepository };
