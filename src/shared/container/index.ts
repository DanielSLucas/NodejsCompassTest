import { container } from "tsyringe";

import { ICustomersRepository } from "../../modules/customer/repositories/ICustomersRepository";
import { CustomersRepository } from "../../modules/customer/repositories/prismaORM/CustomersRepository";

import { ICitiesRepository } from "../../modules/city/repositories/ICitiesRepository";
import { CitiesRepository } from "../../modules/city/repositories/prismaORM/CitiesRepository";

container.registerSingleton<ICitiesRepository>(
  "CitiesRepository",
  CitiesRepository,
);

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository,
);
