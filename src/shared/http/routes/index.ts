import { Router } from "express";
import { customersRoutes } from "../../../modules/customer/http/routes";
import { citiesRoutes } from "../../../modules/city/http/routes";

const routes = Router();

routes.use("/cities", citiesRoutes);
routes.use("/customers", customersRoutes);

export { routes };
