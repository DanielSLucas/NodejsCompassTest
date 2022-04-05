import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateCityController } from "../controllers/CreateCityController";
import { FindCitiesController } from "../controllers/FindCitiesController";

const citiesRoutes = Router();

const createCityController = new CreateCityController();
const findCitiesController = new FindCitiesController();

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

citiesRoutes.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string(),
      state: Joi.string(),
    }),
  }),
  findCitiesController.handle,
);

export { citiesRoutes };
