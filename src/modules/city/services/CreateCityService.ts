import { City } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { CreateCityDTO } from "../dtos/createCity";
import { ICitiesRepository } from "../repositories/ICitiesRepository";

@injectable()
class CreateCityService {
  constructor(
    @inject("CitiesRepository")
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute(createCityDTO: CreateCityDTO): Promise<City> {
    const cityExistis = await this.citiesRepository.findCityByName(
      createCityDTO.name,
    );

    if (cityExistis) {
      throw new AppError("City Already exists");
    }

    const city = await this.citiesRepository.createCity(createCityDTO);

    return city;
  }
}

export { CreateCityService };
