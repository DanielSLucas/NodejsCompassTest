import { AppError } from "../../../shared/errors/AppError";
import { FakeCitiesRepository } from "../repositories/fake/FakeCitiesRepository";
import { CreateCityService } from "./CreateCityService";

let fakeCityRepository: FakeCitiesRepository;
let createCityService: CreateCityService;
describe("CreateCityService", () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCitiesRepository();
    createCityService = new CreateCityService(fakeCityRepository);
  });

  it("Should be able to create a city", async () => {
    const city = await createCityService.execute({
      name: "Guaratinguetá",
      state: "São Paulo",
    });

    expect(city).toHaveProperty("id");
    expect(city.name).toBe("Guaratinguetá");
    expect(city.state).toBe("São Paulo");
  });

  it("Should not be able to create two cities with same name", async () => {
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
