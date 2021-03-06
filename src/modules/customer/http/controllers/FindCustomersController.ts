import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindCustomersService } from "../../services/FindCustomersService";

class FindCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { fullName } = request.query;

    const findCustomersService = container.resolve(FindCustomersService);

    const customers = await findCustomersService.execute({
      fullName: fullName as string,
    });

    return response.status(200).json(customers);
  }
}

export { FindCustomersController };
