import { City } from "@prisma/client";
import { CreateCityDTO } from "../dtos/createCity";

export interface ICitiesRepository {
  createCity(createCityDTO: CreateCityDTO): Promise<City>;
  findCityByName(name: string): Promise<City | null>;
}
