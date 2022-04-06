import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindCitiesService } from "../../services/FindCitiesService";

class FindCitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state } = request.query;

    const findCitiesService = container.resolve(FindCitiesService);

    const cities = await findCitiesService.execute({
      name: name as string | undefined,
      state: state as string | undefined,
    });

    return response.status(200).json(cities);
  }
}

export { FindCitiesController };
