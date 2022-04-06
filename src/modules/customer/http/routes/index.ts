import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { CreateCustomerController } from "../controllers/CreateCustomerController";
import { FindCustomersController } from "../controllers/FindCustomersController";
import { FindCustomerByIdController } from "../controllers/FindCustomerByIdController";
import { RemoveCustomerByIdController } from "../controllers/RemoveCustomerByIdController";
import { UpdateCustomerFullNameController } from "../controllers/UpdateCustomerFullNameController";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const findCustomersController = new FindCustomersController();
const findCustomerByIdController = new FindCustomerByIdController();
const removeCustomerByIdController = new RemoveCustomerByIdController();
const updateCustomerFullNameController = new UpdateCustomerFullNameController();

customersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      fullName: Joi.string().required(),
      sex: Joi.string().valid("male", "female").required(),
      age: Joi.number().required(),
      birthDate: Joi.date().required(),
      city_id: Joi.string().uuid(),
    }),
  }),
  createCustomerController.handle,
);

customersRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      fullName: Joi.string(),
    }),
  }),
  findCustomersController.handle,
);

customersRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  findCustomerByIdController.handle,
);

customersRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  removeCustomerByIdController.handle,
);

customersRoutes.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      fullName: Joi.string().required(),
    }),
  }),
  updateCustomerFullNameController.handle,
);

export { customersRoutes };
