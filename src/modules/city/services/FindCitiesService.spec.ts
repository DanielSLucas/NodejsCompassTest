import { FakeCitiesRepository } from "../repositories/fake/FakeCitiesRepository";
import { CreateCityService } from "./CreateCityService";
import { FindCitiesService } from "./FindCitiesService";

let fakeCityRepository: FakeCitiesRepository;
let createCityService: CreateCityService;
let findCitiesService: FindCitiesService;

describe("FindCitiesService", () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCitiesRepository();
    createCityService = new CreateCityService(fakeCityRepository);
    findCitiesService = new FindCitiesService(fakeCityRepository);
  });

  it("Should be able to list all cities", async () => {
    await createCityService.execute({
      name: "Guaratinguetá",
      state: "São Paulo",
    });

    const cities = await findCitiesService.execute({});

    expect(cities[0]).toHaveProperty("id");
    expect(cities[0].name).toBe("Guaratinguetá");
    expect(cities[0].state).toBe("São Paulo");
  });

  it("Should be able to find a city by name", async () => {
    await createCityService.execute({
      name: "Guaratinguetá",
      state: "São Paulo",
    });

    const cities = await findCitiesService.execute({
      name: "Guaratinguetá",
    });

    expect(cities[0]).toHaveProperty("id");
    expect(cities[0].name).toBe("Guaratinguetá");
    expect(cities[0].state).toBe("São Paulo");
  });

  it("Should be able to find a city by state", async () => {
    await createCityService.execute({
      name: "Guaratinguetá",
      state: "São Paulo",
    });

    const cities = await findCitiesService.execute({
      state: "São Paulo",
    });

    expect(cities[0]).toHaveProperty("id");
    expect(cities[0].name).toBe("Guaratinguetá");
    expect(cities[0].state).toBe("São Paulo");
  });
});
