import { Customer } from '../customer.aggregate';
import { CustomerDeleteDomainEvent } from '../events/customerDelete.domainEvent';

export class CustomerDelete {
  static handle(customer: Customer): Customer {
    customer.record(
      new CustomerDeleteDomainEvent({
        aggregateId: customer.id.value,
        customer: {
          id: customer.id.value
        }
      })
    );
    return customer;
  }
}
