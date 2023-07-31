import { Customer } from '../customer';
import { CustomerInactivateDomainEvent } from '../events/customerInactivateDomainEvent';
import { CustomerStates } from '../valueObjects/customerStatus';

export class CustomerInactivate extends Customer {
  static handle(customer: Customer): Customer {
    const rawCustomer = customer.toPrimitives();
    rawCustomer.status = CustomerStates.INACTIVE;
    const customerAggregate = Customer.fromPrimitives(rawCustomer);
    customerAggregate.record(
      new CustomerInactivateDomainEvent({
        aggregateId: customerAggregate.id.value,
        customer: {
          id: customerAggregate.id.value
        }
      })
    );
    return customerAggregate;
  }
}
