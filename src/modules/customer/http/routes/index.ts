import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateCustomerController } from "../controllers/CreateCustomerController";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();

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

export { customersRoutes };
