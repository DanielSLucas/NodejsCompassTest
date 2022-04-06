import { FakeCustomersRepository } from "../repositories/fake/FakeCustomersRepository";
import { CreateCustomerService } from "./CreateCustomerService";
import { FindCustomersService } from "./FindCustomersService";

describe("FindCustomersService", () => {
  it("Should be able list all customers", async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
    );
    const findCustomersService = new FindCustomersService(
      fakeCustomerRepository,
    );

    const customer1 = await createCustomerService.execute({
      fullName: "John Doe",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    const customer2 = await createCustomerService.execute({
      fullName: "Doe John",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    const customers = await findCustomersService.execute({});

    expect(customers).toBeInstanceOf(Array);
    expect(customers).toEqual([customer1, customer2]);
    expect(customers.length).toBe(2);
  });

  it("Should be able find a customer by name", async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
    );
    const findCustomersService = new FindCustomersService(
      fakeCustomerRepository,
    );

    const searchedCustomer = await createCustomerService.execute({
      fullName: "John Doe",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    await createCustomerService.execute({
      fullName: "Doe John",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    const customers = await findCustomersService.execute({
      fullName: "John Doe",
    });

    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBe(1);
    expect(customers).toEqual([searchedCustomer]);
  });
});
