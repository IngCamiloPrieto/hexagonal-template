import { EventBus } from '../../../shared/domain/eventBus';
import { Customer } from '../../domain/customer';
import { CustomerId } from '../../domain/customerId';
import { CustomerRepository } from '../../domain/customerRepository';
import { CustomerDeleteDomainEvent } from '../../domain/events/customerDeleteDomainEvent';

export class CustomerDeleter {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: CustomerId }): Promise<Customer | null> {
    let customerRecord = await this.repository.find(params.id);
    if (customerRecord) {
      await this.repository.delete(customerRecord);
      customerRecord.record(
        new CustomerDeleteDomainEvent({
          aggregateId: customerRecord.id.value,
          customer: customerRecord.toPrimitives()
        })
      );
      await this.eventBus.publish(customerRecord.pullDomainEvents());
    }
    return customerRecord;
  }
}
