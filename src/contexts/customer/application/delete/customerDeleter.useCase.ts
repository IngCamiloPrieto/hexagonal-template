import { EventBus } from '../../../shared/domain/eventBus';
import { PrimitivesCustomer } from '../../domain/customer.aggregate';
import { CustomerId } from '../../domain/valueObjects/customerId.valueObject';
import { CustomerRepository } from '../../domain/customer.repository';
import { Result } from '../../../shared/domain/result';
import { CustomerDelete } from '../../domain/actions/customerDelete.action';
import { CustomerNotExist } from '../../domain/errors/customerNotExist.error';

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
