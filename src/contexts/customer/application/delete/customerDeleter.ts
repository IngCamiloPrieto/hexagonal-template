import { EventBus } from '../../../shared/domain/eventBus';
import { PrimitivesCustomer } from '../../domain/customer';
import { CustomerId } from '../../domain/valueObjects/customerId';
import { CustomerRepository } from '../../domain/customerRepository';
import { Result } from '../../../shared/domain/result';
import { CustomerDelete } from '../../domain/actions/customerDelete';
import { CustomerNotExist } from '../../domain/errors/customerNotExist';

export class CustomerDeleter {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: string }): Promise<Result<PrimitivesCustomer>> {
    const result = new Result<PrimitivesCustomer>();
    const customerId = new CustomerId(params.id);
    let customer = await this.repository.find(customerId);
    if (!customer) throw new CustomerNotExist();
    await this.repository.delete(customer);
    customer = CustomerDelete.handle(customer);
    await this.eventBus.publish(customer.pullDomainEvents());
    result.setData(customer.toPrimitives()).addMessage('Customer deleted successfully');
    return result;
  }
}
