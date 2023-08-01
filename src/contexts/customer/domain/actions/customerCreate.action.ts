import { Customer } from '../customer.aggregate';
import { CustomerCreateDomainEvent } from '../events/customerCreate.domainEvent';
import { CustomerEmail } from '../valueObjects/customerEmail.valueObject';
import { CustomerId } from '../valueObjects/customerId.valueObject';
import { CustomerName } from '../valueObjects/customerName.valueObject';
import { CustomerStates, CustomerStatus } from '../valueObjects/customerStatus.valueObject';

export class CustomerCreate {
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
