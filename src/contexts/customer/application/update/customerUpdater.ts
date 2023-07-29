import { EventBus } from '../../../Shared/domain/EventBus';
import { Customer } from '../../domain/customer';
import { CustomerEmail } from '../../domain/customerEmail';
import { CustomerId } from '../../domain/customerId';
import { CustomerName } from '../../domain/customerName';
import { CustomerRepository } from '../../domain/customerRepository';
import { CustomerUpdateDomainEvent } from '../../domain/events/CustomerUpdateDomainEvent';

export class CustomerUpdater {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: CustomerId; name: CustomerName; email: CustomerEmail }): Promise<Customer | null> {
    const customer = Customer.create(params.id, params.name, params.email);
    let customerRecord = await this.repository.find(params.id);
    if (customerRecord) {
      customerRecord = await this.repository.update(customer);
      customer.record(
        new CustomerUpdateDomainEvent({
          aggregateId: customer.id.value,
          customer: customer.toPrimitives()
        })
      );
      await this.eventBus.publish(customer.pullDomainEvents());
    }
    return customerRecord;
  }
}
