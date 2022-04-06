import { AppError } from "../../../shared/errors/AppError";
import { FakeCustomersRepository } from "../repositories/fake/FakeCustomersRepository";
import { CreateCustomerService } from "./CreateCustomerService";
import { FindCustomersService } from "./FindCustomersService";
import { RemoveCustomerByIdService } from "./RemoveCustomerByIdService";

let fakeCustomersRepository: FakeCustomersRepository;
let removeCustomerByIdService: RemoveCustomerByIdService;

describe("RemoveCustomerByIdService", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    removeCustomerByIdService = new RemoveCustomerByIdService(
      fakeCustomersRepository,
    );
  });

  it("Should be able to remove an customer by id", async () => {
    const findCustomersService = new FindCustomersService(
      fakeCustomersRepository,
    );
    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    const customer = await createCustomerService.execute({
      fullName: "John Doe",
      sex: "male",
      age: 27,
      birthDate: new Date(2000, 2, 15),
      city_id: "1234",
    });

    await removeCustomerByIdService.execute(customer.id);

    const customers = await findCustomersService.execute({});

    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBe(0);
  });

  it("Should not be able to delete a non-existent customer", async () => {
    await expect(
      removeCustomerByIdService.execute("non-existent-id"),
    ).rejects.toBeInstanceOf(AppError);
  });
});
