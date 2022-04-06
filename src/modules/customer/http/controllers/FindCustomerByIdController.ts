import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindCustomerByIdService } from "../../services/FindCustomerByIdService";

class FindCustomerByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCustomerByIdService = container.resolve(FindCustomerByIdService);

    const customer = await findCustomerByIdService.execute(id);

    return response.status(200).json(customer);
  }
}

export { FindCustomerByIdController };
