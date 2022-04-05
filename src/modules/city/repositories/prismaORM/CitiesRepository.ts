import { City } from "@prisma/client";
import { prismaClient } from "../../../../shared/database";
import { CreateCityDTO } from "../../dtos/createCity";
import { ICitiesRepository } from "../ICitiesRepository";

class CitiesRepository implements ICitiesRepository {
  private repository = prismaClient.city;

  async createCity(createCityDTO: CreateCityDTO): Promise<City> {
    const city = await this.repository.create({
      data: createCityDTO,
    });

    return city;
  }

  async findCityByName(name: string): Promise<City | null> {
    const city = await this.repository.findFirst({
      where: {
        name,
      },
    });

    return city;
  }

  async findCities(name?: string, state?: string): Promise<City[]> {
    const filters = {};

    if (name) {
      Object.assign(filters, { name });
    }

    if (state) {
      Object.assign(filters, { name });
    }

    const cities = await this.repository.findMany({
      where: filters,
    });

    return cities;
  }
}

export { CitiesRepository };
