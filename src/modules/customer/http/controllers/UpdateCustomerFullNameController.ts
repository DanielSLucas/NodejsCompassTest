import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCustomerFullNameService } from "../../services/UpdateCustomerFullNameService";

class UpdateCustomerFullNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { fullName } = request.body;

    const updateCustomerFullNameService = container.resolve(
      UpdateCustomerFullNameService,
    );

    const customer = await updateCustomerFullNameService.execute(id, fullName);

    return response.status(200).json(customer);
  }
}

export { UpdateCustomerFullNameController };
