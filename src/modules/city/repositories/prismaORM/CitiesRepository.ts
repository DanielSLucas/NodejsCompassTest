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
}

export { CitiesRepository };
