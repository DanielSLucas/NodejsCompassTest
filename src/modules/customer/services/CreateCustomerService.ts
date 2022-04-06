import { Customer } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { CreateCustomerDTO } from "../dtos/createCustomer";
import { ICustomersRepository } from "../repositories/ICustomersRepository";

@injectable()
class CreateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(customerDTO: CreateCustomerDTO): Promise<Customer> {
    const customerExists = await this.customersRepository.findCustomerByName(
      customerDTO.fullName,
    );

    if (customerExists) {
      throw new AppError("A customer with that name already exists.");
    }

    const customer = await this.customersRepository.createCustomer(customerDTO);

    return customer;
  }
}

export { CreateCustomerService };
