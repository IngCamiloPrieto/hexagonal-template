import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { CustomerId } from '../../../domain/customerId';
import { Customer } from '../../../domain/customer';
import { CustomerEmail } from '../../../domain/customerEmail';
import { CustomerName } from '../../../domain/customerName';

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
    }
  }
});
