import { EventBus } from '../../../shared/domain/eventBus';
import { Result } from '../../../shared/domain/result';
import { Customer, PrimitivesCustomer } from '../../domain/customer';
import { CustomerEmail } from '../../domain/customerEmail';
import { CustomerId } from '../../domain/customerId';
import { CustomerName } from '../../domain/customerName';
import { CustomerRepository } from '../../domain/customerRepository';
import { CustomerCreateDomainEvent } from '../../domain/events/customerCreateDomainEvent';

export class CustomerCreator {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: string; name: string; email: string }): Promise<Result<PrimitivesCustomer>> {
    const id = new CustomerId(params.id);
    const name = new CustomerName(params.name);
    const email = new CustomerEmail(params.email);
    const customer = Customer.create(id, name, email);
    const customerCreated = await this.repository.add(customer);
    const primitiveCustomer = customerCreated.toPrimitives();
    customer.record(
      new CustomerCreateDomainEvent({
        aggregateId: customer.id.value,
        customer: primitiveCustomer
      })
    );
    await this.eventBus.publish(customer.pullDomainEvents());
    const result = new Result<PrimitivesCustomer>();
    result.setData(primitiveCustomer);
    return result;
  }
}
