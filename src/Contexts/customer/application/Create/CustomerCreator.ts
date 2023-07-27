import { EventBus } from '../../../Shared/domain/EventBus';
import { Customer } from '../../domain/customer';
import { CustomerEmail } from '../../domain/customerEmail';
import { CustomerId } from '../../domain/customerId';
import { CustomerName } from '../../domain/customerName';
import { CustomerRepository } from '../../domain/customerRepository';
import { CustomerCreateDomainEvent } from '../../domain/events/CustomerCreateDomainEvent';

export class CustomerCreator {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: CustomerId; name: CustomerName; email: CustomerEmail }): Promise<Customer> {
    const customer = Customer.create(params.id, params.name, params.email);
    const customerCreated = await this.repository.add(customer);
    customer.record(
      new CustomerCreateDomainEvent({
        aggregateId: customer.id.value,
        customer: customer.toPrimitives()
      })
    );
    await this.eventBus.publish(customer.pullDomainEvents());
    return customerCreated;
  }
}
