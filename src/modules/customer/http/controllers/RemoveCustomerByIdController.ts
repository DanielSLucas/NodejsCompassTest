import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveCustomerByIdService } from "../../services/RemoveCustomerByIdService";

class RemoveCustomerByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeCustomerByIdService = container.resolve(
      RemoveCustomerByIdService,
    );

    await removeCustomerByIdService.execute(id);

    return response.status(204).send();
  }
}

export { RemoveCustomerByIdController };
