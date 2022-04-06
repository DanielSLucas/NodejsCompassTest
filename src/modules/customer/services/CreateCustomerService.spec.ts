import { AppError } from "../../../shared/errors/AppError";
import { FakeCustomersRepository } from "../repositories/fake/FakeCustomersRepository";
import { CreateCustomerService } from "./CreateCustomerService";

describe("CreateCustomerService", () => {
  it("Should be able to create an customer with an id", async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
    );

    const customer = await createCustomerService.execute({
      fullName: "John Doe",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    expect(customer).toHaveProperty("id");
    expect(customer.fullName).toBe("John Doe");
    expect(customer.sex).toBe("male");
    expect(customer.age).toBe(27);
    expect(customer.birthDate).toEqual(new Date(2000, 2, 15));
    expect(customer.city_id).toBe("1234");
  });

  it("Should not be able to create two customers with same name", async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
    );

    await createCustomerService.execute({
      fullName: "John Doe",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    await expect(
      createCustomerService.execute({
        fullName: "John Doe",
        sex: "male",
        age: 27,
        birthDate: new Date(2000, 2, 15),
        city_id: "1234",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
