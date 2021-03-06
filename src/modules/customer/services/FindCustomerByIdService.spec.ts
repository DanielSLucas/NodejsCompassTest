import { AppError } from "../../../shared/errors/AppError";
import { FakeCustomersRepository } from "../repositories/fake/FakeCustomersRepository";
import { CreateCustomerService } from "./CreateCustomerService";
import { FindCustomerByIdService } from "./FindCustomerByIdService";

let fakeCustomerRepository: FakeCustomersRepository;
let findCustomerByIdService: FindCustomerByIdService;
describe("FindCustomerByIdService", () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    findCustomerByIdService = new FindCustomerByIdService(
      fakeCustomerRepository,
    );
  });

  it("Should be able to find a customer by id", async () => {
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
    );

    const createdCustomer = await createCustomerService.execute({
      fullName: "John Doe",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    const customer = await findCustomerByIdService.execute(createdCustomer.id);

    expect(customer).toHaveProperty("id");
    expect(customer.fullName).toBe("John Doe");
    expect(customer.sex).toBe("male");
    expect(customer.age).toBe(27);
    expect(customer.birthDate).toEqual(new Date(2000, 2, 15));
    expect(customer.city_id).toBe("1234");
  });

  it("Should not be able to find a customer unsing an non-existent id", async () => {
    await expect(
      findCustomerByIdService.execute("non-existent-id"),
    ).rejects.toBeInstanceOf(AppError);
  });
});
