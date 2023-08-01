import { PrimitivesCustomer } from '../../domain/customer.aggregate';
import { CustomerId } from '../../domain/valueObjects/customerId.valueObject';
import { CustomerRepository } from '../../domain/customer.repository';
import { Result } from '../../../shared/domain/result';
import { CustomerNotExist } from '../../domain/errors/customerNotExist.error';

export class CustomerGetById {
  constructor(private repository: CustomerRepository) {}

  async run(params: { id: string }): Promise<Result<PrimitivesCustomer>> {
    const result = new Result<PrimitivesCustomer>();
    const customerId = new CustomerId(params.id);
    let customer = await this.repository.find(customerId);
    if (!customer) throw new CustomerNotExist();
    result.setData(customer.toPrimitives());
    return result;
  }
}
