import { Customer } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { ICustomersRepository } from "../repositories/ICustomersRepository";

@injectable()
class FindCustomerByIdService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findCustomerById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }
}

export { FindCustomerByIdService };
