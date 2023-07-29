import { Criteria } from '../../Shared/domain/criteria/Criteria';
import { Customer } from './customer';
import { CustomerId } from './customerId';

export interface CustomerRepository {
  find(id: CustomerId): Promise<Customer | null>;
  add(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(customer: Customer): Promise<void>;
  findAll(criteria: Criteria): Promise<Array<Customer>>;
}
