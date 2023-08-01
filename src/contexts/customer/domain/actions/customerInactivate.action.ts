import { Customer } from '../customer.aggregate';
import { CustomerInactivateDomainEvent } from '../events/customerInactivate.domainEvent';
import { CustomerStates, CustomerStatus } from '../valueObjects/customerStatus.valueObject';

export class CustomerInactivate {
  static handle(customer: Customer): Customer {
    customer.status = new CustomerStatus(CustomerStates.INACTIVE);
    customer.record(
      new CustomerInactivateDomainEvent({
        aggregateId: customer.id.value,
        customer: {
          id: customer.id.value
        }
      })
    );
    return customer;
  }
}
