export type CreateCustomerDTO = {
  fullName: string;
  sex: "male" | "female";
  birthDate: Date;
  age: number;
  city_id: string;
};
