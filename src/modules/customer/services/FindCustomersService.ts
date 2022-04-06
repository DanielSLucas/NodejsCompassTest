import { Customer } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../repositories/ICustomersRepository";

export type CustomerFilters = {
  fullName?: string;
};

@injectable()
class FindCustomersService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(filters: CustomerFilters): Promise<Customer[]> {
    const customers = this.customersRepository.findCustomers(filters);

    return customers;
  }
}

export { FindCustomersService };
