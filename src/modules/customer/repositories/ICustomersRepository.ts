import { Customer } from "@prisma/client";
import { CreateCustomerDTO } from "../dtos/createCustomer";
import { CustomerFilters } from "../services/FindCustomersService";

export interface ICustomersRepository {
  createCustomer(customerData: CreateCustomerDTO): Promise<Customer>;
  findCustomerByName(fullName: string): Promise<Customer | null>;
  findCustomers(filters: CustomerFilters): Promise<Customer[]>;
}
