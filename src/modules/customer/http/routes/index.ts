import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateCustomerController } from "../controllers/CreateCustomerController";
import { FindCustomersController } from "../controllers/FindCustomersController";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const findCustomersController = new FindCustomersController();

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

export { customersRoutes };
