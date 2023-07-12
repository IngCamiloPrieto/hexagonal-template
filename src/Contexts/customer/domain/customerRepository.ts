import { Criteria } from '../../Shared/domain/criteria/Criteria';
import { Customer } from './customer';

export interface CourseRepository {    
  find(id: string): Promise<Customer>;
  add(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<Customer>;
  findAll(criteria: Criteria): Promise<Array<Customer>>;  
}
