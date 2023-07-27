import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerCreator } from './CustomerCreator';
import { Command } from '../../../Shared/domain/Command';
import { CreateCustomerCommand } from '../../domain/CreateCustomerCommand';
import { CustomerEmail } from '../../domain/customerEmail';
import { CustomerName } from '../../domain/customerName';
import { CustomerId } from '../../domain/customerId';
import { Customer } from '../../domain/customer';

export class CreateCustomerCommandHandler implements CommandHandler<CreateCustomerCommand, Customer> {
  constructor(private customerCreator: CustomerCreator) {}

  subscribedTo(): Command {
    return CreateCustomerCommand;
  }

  async handle(command: CreateCustomerCommand): Promise<Customer> {
    const id = new CustomerId(command.id);
    const name = new CustomerName(command.name);
    const email = new CustomerEmail(command.email);
    return await this.customerCreator.run({ id, name, email });
  }
}
