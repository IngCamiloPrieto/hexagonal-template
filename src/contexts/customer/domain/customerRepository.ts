import { Criteria } from '../../shared/domain/criteria/criteria';
import { Customer } from './customer';
import { CustomerId } from './valueObjects/customerId';

export interface CustomerRepository {
  find(id: CustomerId): Promise<Customer | null>;
  add(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(customer: Customer): Promise<void>;
  findAll(criteria: Criteria): Promise<Array<Customer>>;
}
