import { City } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { ICitiesRepository } from "../repositories/ICitiesRepository";

type CityFilters = {
  name?: string;
  state?: string;
};

@injectable()
class FindCitiesService {
  constructor(
    @inject("CitiesRepository")
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute({ name, state }: CityFilters): Promise<City[]> {
    const cities = await this.citiesRepository.findCities(name, state);

    return cities;
  }
}

export { FindCitiesService };
