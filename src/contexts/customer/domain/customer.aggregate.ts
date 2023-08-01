import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { CustomerEmail } from './valueObjects/customerEmail.valueObject';
import { CustomerId } from './valueObjects/customerId.valueObject';
import { CustomerName } from './valueObjects/customerName.valueObject';
import { CustomerStates, CustomerStatus } from './valueObjects/customerStatus.valueObject';

export class Customer extends AggregateRoot {
  readonly id: CustomerId;
  public name: CustomerName;
  public email: CustomerEmail;
  public status: CustomerStatus;

  constructor(id: CustomerId, name: CustomerName, email: CustomerEmail, status: CustomerStatus) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string, status: CustomerStates }): Customer {
    return new Customer(
      new CustomerId(plainData.id),
      new CustomerName(plainData.name),
      new CustomerEmail(plainData.email),
      new CustomerStatus(plainData.status)
    );
  }

  toPrimitives(): PrimitivesCustomer {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      status: this.status.value as CustomerStates
    };
  }
}

export type PrimitivesCustomer = {
  id: string;
  name: string;
  email: string;
  status: CustomerStates;
};
