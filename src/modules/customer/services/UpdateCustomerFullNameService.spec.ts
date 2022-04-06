import { AppError } from "../../../shared/errors/AppError";
import { FakeCustomersRepository } from "../repositories/fake/FakeCustomersRepository";
import { CreateCustomerService } from "./CreateCustomerService";
import { UpdateCustomerFullNameService } from "./UpdateCustomerFullNameService";

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomerFullNameService: UpdateCustomerFullNameService;

describe("UpdateCustomerFullNameService", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomerFullNameService = new UpdateCustomerFullNameService(
      fakeCustomersRepository,
    );
  });

  it("Should be able to update the name of the specified customer", async () => {
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

    const updatedCustomer = await updateCustomerFullNameService.execute(
      customer.id,
      "The John Doe",
    );

    expect(updatedCustomer.fullName).toBe("The John Doe");
  });

  it("Should not be able to update the name of a non-existent customer", async () => {
    await expect(
      updateCustomerFullNameService.execute(
        "non-existent-customer",
        "The John Doe",
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
