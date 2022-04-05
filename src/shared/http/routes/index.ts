import { Router } from "express";
import { citiesRoutes } from "../../../modules/city/http/routes";

const routes = Router();

routes.use("/cities", citiesRoutes);

export { routes };
