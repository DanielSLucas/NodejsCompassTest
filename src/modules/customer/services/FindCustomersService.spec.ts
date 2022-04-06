import { FakeCustomersRepository } from "../repositories/fake/FakeCustomersRepository";
import { CreateCustomerService } from "./CreateCustomerService";
import { FindCustomersService } from "./FindCustomersService";

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;
let findCustomersService: FindCustomersService;
describe("FindCustomersService", () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
    findCustomersService = new FindCustomersService(fakeCustomerRepository);
  });

  it("Should be able list all customers", async () => {
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
