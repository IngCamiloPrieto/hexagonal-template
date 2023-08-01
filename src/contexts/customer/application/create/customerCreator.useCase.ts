import { EventBus } from '../../../shared/domain/eventBus';
import { Result } from '../../../shared/domain/result';
import { PrimitivesCustomer } from '../../domain/customer.aggregate';
import { CustomerEmail } from '../../domain/valueObjects/customerEmail.valueObject';
import { CustomerId } from '../../domain/valueObjects/customerId.valueObject';
import { CustomerName } from '../../domain/valueObjects/customerName.valueObject';
import { CustomerRepository } from '../../domain/customer.repository';
import { CustomerCreate } from '../../domain/actions/customerCreate.action';

export class CustomerCreator {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: string; name: string; email: string }): Promise<Result<PrimitivesCustomer>> {
    const result = new Result<PrimitivesCustomer>();
    const id = new CustomerId(params.id);
    const name = new CustomerName(params.name);
    const email = new CustomerEmail(params.email);
    const customer = CustomerCreate.handle(id, name, email);
    const customerCreated = await this.repository.add(customer);
    const primitiveCustomer = customerCreated.toPrimitives();
    await this.eventBus.publish(customer.pullDomainEvents());
    result.setData(primitiveCustomer).addMessage('Customer created successfully');
    return result;
  }
}
