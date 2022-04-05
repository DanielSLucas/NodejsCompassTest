import { City } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateCityDTO } from "../../dtos/createCity";
import { ICitiesRepository } from "../ICitiesRepository";

class FakeCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  async createCity({ name, state }: CreateCityDTO): Promise<City> {
    const city = {
      id: randomUUID(),
      name,
      state,
    };

    this.cities.push(city);

    return city;
  }

  async findCityByName(name: string): Promise<City | null> {
    const findCity = this.cities.find(city => city.name === name);

    if (!findCity) return null;

    return findCity;
  }
}

export { FakeCitiesRepository };
