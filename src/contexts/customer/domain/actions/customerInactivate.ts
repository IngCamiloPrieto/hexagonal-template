import { Customer } from '../customer';
import { CustomerInactivateDomainEvent } from '../events/customerInactivateDomainEvent';
import { CustomerStates, CustomerStatus } from '../valueObjects/customerStatus';

export class CustomerInactivate {
  static handle(customer: Customer): Customer {
    customer.status  = new CustomerStatus( CustomerStates.INACTIVE);
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
