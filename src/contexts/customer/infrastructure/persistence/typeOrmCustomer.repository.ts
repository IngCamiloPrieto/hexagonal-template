import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { CustomerId } from '../../domain/valueObjects/customerId.valueObject';
import { Customer } from '../../domain/customer.aggregate';
import { CustomerRepository } from '../../domain/customer.repository';
import { CustomerEntity } from './typeorm/customer.entity';

export class TypeOrmCustomerRepository extends TypeOrmRepository<Customer> implements CustomerRepository {
  public add(customer: Customer): Promise<Customer> {
    return this.persist<Customer>(customer);
  }
  public update(customer: Customer): Promise<Customer> {
    return this.persist(customer);
  }
  public async delete(customer: Customer): Promise<void> {
    await this.remove(customer);
  }

  public async find(id: CustomerId): Promise<Customer | null> {
    const repository = await this.repository();
    const customer = await repository.findOneBy({ id: {
      value: id.value
    } });
    return customer;
  }

  public async search(id: CustomerId): Promise<Nullable<Customer>> {
    const repository = await this.repository();
    const customer = await repository.findOne({ where: { id: id.value } });
    return customer;
  }

  protected entitySchema(): EntitySchema<Customer> {
    return CustomerEntity;
  }

  public async findAll(): Promise<Customer[]> {
    const repository = await this.repository();
    const customers = await repository.find();
    return customers;
  }
}
