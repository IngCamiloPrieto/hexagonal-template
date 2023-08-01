import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { CustomerId } from '../../../domain/valueObjects/customerId.valueObject';
import { Customer } from '../../../domain/customer.aggregate';
import { CustomerEmail } from '../../../domain/valueObjects/customerEmail.valueObject';
import { CustomerName } from '../../../domain/valueObjects/customerName.valueObject';
import { CustomerStatus } from '../../../domain/valueObjects/customerStatus.valueObject';

export const CustomerEntity = new EntitySchema<Customer>({
  name: 'Customer',
  tableName: 'customers',
  target: Customer,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CustomerId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(CustomerName)
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(CustomerEmail)
    },
    status: {
      type: String,
      transformer: ValueObjectTransformer(CustomerStatus)
    }
  }
});
