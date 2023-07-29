import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { CustomerEmail } from "./customerEmail";
import { CustomerId } from "./customerId";
import { CustomerName } from "./customerName";

export class Customer extends AggregateRoot {
  readonly id: CustomerId;
  readonly name: CustomerName;
  readonly email: CustomerEmail;

  constructor(id: CustomerId, name: CustomerName, email: CustomerEmail) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static create(
    id: CustomerId,
    name: CustomerName,
    email: CustomerEmail
  ): Customer {
    const customer = new Customer(id, name, email);
    return customer;
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string }): Customer {
    return new Customer(
      new CustomerId(plainData.id),
      new CustomerName(plainData.name),
      new CustomerEmail(plainData.email)
    );
  }

  toPrimitives(): PrimitivesCustomer {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value
    };
  }
}


export type PrimitivesCustomer = {
  id: string;
  name: string;
  email: string;
}