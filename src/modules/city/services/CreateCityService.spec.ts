import { AppError } from "../../../shared/errors/AppError";
import { FakeCitiesRepository } from "../repositories/fake/FakeCitiesRepository";
import { CreateCityService } from "./CreateCityService";

describe("CreateCityService", () => {
  it("Should be able to create a city with an id", async () => {
    const fakeCityRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCityRepository);

    const city = await createCityService.execute({
      name: "Guaratinguetá",
      state: "São Paulo",
    });

    expect(city).toHaveProperty("id");
    expect(city.name).toBe("Guaratinguetá");
    expect(city.state).toBe("São Paulo");
  });

  it("Should not be able to create two cities with same name", async () => {
    const fakeCityRepository = new FakeCitiesRepository();
    const createCityService = new CreateCityService(fakeCityRepository);

    await createCityService.execute({
      name: "Guaratinguetá",
      state: "São Paulo",
    });

    await expect(
      createCityService.execute({
        name: "Guaratinguetá",
        state: "São Paulo",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
