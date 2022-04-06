import { Customer } from "@prisma/client";
import { CreateCustomerDTO } from "../dtos/createCustomer";

export interface ICustomersRepository {
  createCustomer(customerData: CreateCustomerDTO): Promise<Customer>;
  findCustomerByName(fullName: string): Promise<Customer | null>;
}
