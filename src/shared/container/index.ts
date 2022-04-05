import { container } from "tsyringe";

import { ICitiesRepository } from "../../modules/city/repositories/ICitiesRepository";
import { CitiesRepository } from "../../modules/city/repositories/prismaORM/CitiesRepository";

container.registerSingleton<ICitiesRepository>(
  "CitiesRepository",
  CitiesRepository,
);
