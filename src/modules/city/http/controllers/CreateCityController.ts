import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCityService } from "../../services/CreateCityService";

class CreateCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state } = request.body;

    const createCityService = container.resolve(CreateCityService);

    const city = await createCityService.execute({
      name,
      state,
    });

    return response.status(201).json(city);
  }
}

export { CreateCityController };
