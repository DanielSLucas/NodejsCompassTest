import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateCityController } from "../controllers/CreateCityController";

const citiesRoutes = Router();

const createCityController = new CreateCityController();

citiesRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      state: Joi.string().required(),
    }),
  }),
  createCityController.handle,
);

export { citiesRoutes };
