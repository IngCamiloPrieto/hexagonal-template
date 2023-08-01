import { EventBus } from '../../../shared/domain/eventBus';
import { PrimitivesCustomer } from '../../domain/customer.aggregate';
import { CustomerId } from '../../domain/valueObjects/customerId.valueObject';
import { CustomerRepository } from '../../domain/customer.repository';
import { CustomerInactivate } from '../../domain/actions/customerInactivate.action';
import { Result } from '../../../shared/domain/result';
import { CustomerNotExist } from '../../domain/errors/customerNotExist.error';

export class CustomerInactivator {
  constructor(private repository: CustomerRepository, private eventBus: EventBus) {}

  async run(params: { id: string }): Promise<Result<PrimitivesCustomer>> {
    const result = new Result<PrimitivesCustomer>();
    const customerId = new CustomerId(params.id);
    let customer = await this.repository.find(customerId);
    if (!customer) throw new CustomerNotExist();
    customer = CustomerInactivate.handle(customer);
    customer = await this.repository.update(customer);
    await this.eventBus.publish(customer.pullDomainEvents());
    result.setData(customer.toPrimitives()).addMessage('Customer disabled successfully');
    return result;
  }
}
