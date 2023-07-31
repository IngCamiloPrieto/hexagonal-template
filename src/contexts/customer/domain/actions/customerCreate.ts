import { Customer } from '../customer';
import { CustomerCreateDomainEvent } from '../events/customerCreateDomainEvent';
import { CustomerEmail } from '../valueObjects/customerEmail';
import { CustomerId } from '../valueObjects/customerId';
import { CustomerName } from '../valueObjects/customerName';
import { CustomerStates, CustomerStatus } from '../valueObjects/customerStatus';

export class CustomerCreate extends Customer {
  static handle(id: CustomerId, name: CustomerName, email: CustomerEmail): Customer {
    const status = new CustomerStatus(CustomerStates.ACTIVE);
    const customer = new Customer(id, name, email, status);
    customer.record(
      new CustomerCreateDomainEvent({
        aggregateId: customer.id.value,
        customer: customer.toPrimitives()
      })
    );
    return customer;
  }
}
