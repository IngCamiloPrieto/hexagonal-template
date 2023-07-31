import { Customer } from '../customer';
import { CustomerDeleteDomainEvent } from '../events/customerDeleteDomainEvent';

export class CustomerDelete extends Customer {
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
