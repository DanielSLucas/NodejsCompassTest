import { Customer } from "@prisma/client";
import { CreateCustomerDTO } from "modules/customer/dtos/createCustomer";
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
    });

    return customer;
  }
}
export { CustomersRepository };
