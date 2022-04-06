import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerService } from "../../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { fullName, sex, age, birthDate, city_id } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    const city = await createCustomerService.execute({
      fullName,
      sex,
      age,
      birthDate,
      city_id,
    });

    return response.status(201).json(city);
  }
}

export { CreateCustomerController };
