import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { ICustomersRepository } from "../repositories/ICustomersRepository";

@injectable()
class RemoveCustomerByIdService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const customerExists = await this.customersRepository.findCustomerById(id);

    if (!customerExists) {
      throw new AppError("Customer not found", 404);
    }

    await this.customersRepository.removeCustomerById(id);
  }
}

export { RemoveCustomerByIdService };
